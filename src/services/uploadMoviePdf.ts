import { supabase } from '@/lib/supabase';


export async function uploadMoviePdf(file: File): Promise<string> {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Only PDF files are allowed. Please don’t try to sneak in a Word doc. I see you.');
  }

  const fileName = `${Date.now()}-${file.name}`;

  // 1. Upload the PDF to the 'pdfs' bucket
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('pdfs')
    .upload(fileName, file, {
      cacheControl: '3600', // cache for 1 hour
      upsert: false, // do not overwrite existing files
    });

  if (uploadError) {
    console.error('Upload failed:', uploadError.message);
    throw new Error(`PDF upload failed: ${uploadError.message}`);
  }

  // 2. Generate a signed URL valid for 7 days
  const { data: signedData, error: signedError } = await supabase.storage
    .from('pdfs')
    .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 days

  if (signedError || !signedData?.signedUrl) {
    console.error('Signed URL generation failed:', signedError?.message);
    throw new Error(`Failed to generate signed URL: ${signedError?.message}`);
  }

  // 3. Return the signed URL
  return signedData.signedUrl;
}
