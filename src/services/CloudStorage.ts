export class CloudStorage {
  private static API_BASE = "http://localhost:8000/api/v1"; // Dev environment

  static async uploadFile(file: Blob, filename: string): Promise<string> {
    try {
      // 1. Get Presigned URL from Backend
      const response = await fetch(`${this.API_BASE}/storage/upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, fileType: file.type })
      });
      
      if (!response.ok) throw new Error("Failed to get upload URL");
      
      const { uploadUrl, fields, publicUrl } = await response.json();
      
      // 2. Upload directly to S3/OSS
      const formData = new FormData();
      Object.keys(fields).forEach(key => {
        formData.append(key, fields[key]);
      });
      formData.append("file", file);
      
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });
      
      if (!uploadResponse.ok) throw new Error("Upload to cloud failed");
      
      console.log(`Uploaded ${filename} successfully`);
      return publicUrl;
      
    } catch (error) {
      console.error("CloudStorage Error:", error);
      throw error;
    }
  }
}
