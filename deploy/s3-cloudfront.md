## Connect Your S3 Bucket (`eb-clean.hu`) to a Custom Domain with SSL

To connect your S3 bucket **eb-clean.hu** to a custom domain with SSL, you need to use **AWS Certificate Manager (ACM)** for the certificate and **CloudFront** as the distribution layer.

---

## Phase 1: Request an SSL Certificate

> **Important:** CloudFront requires SSL certificates to be created in the **US East (N. Virginia)** region (`us-east-1`), even if your bucket is elsewhere.

1. Open the **ACM Console**.
2. Ensure your region is set to **US East (N. Virginia)**.
3. Click **Request** → **Request a public certificate**.
4. **Fully qualified domain name**:
   - Enter `eb-clean.hu`
   - Click **Add another name** and add `www.eb-clean.hu`
5. Select **DNS validation (recommended)**.
6. After requesting:
   - Click the **certificate ID**
   - Click **Create records in Route 53** (if you use Route 53) to validate automatically  
   - If using another DNS provider, copy the **CNAME name and value** into your registrar’s DNS settings
7. Wait for the certificate status to change to **Issued**.

---

## Phase 2: Create a CloudFront Distribution

Now you will point CloudFront to your S3 **static website endpoint**.

1. Open the **CloudFront Console**.
2. Click **Create distribution**.
3. **Origin Domain**:
   - ⚠️ **Crucial:** Do **not** select the bucket from the dropdown.
   - Go to your S3 bucket → **Properties**
   - Copy the **Static website hosting endpoint**  
     (e.g. `eb-clean.hu.s3-website-us-east-1.amazonaws.com`)
   - Paste it into the **Origin Domain** field.
4. **Default cache behavior**:
   - **Viewer protocol policy**: Select **Redirect HTTP to HTTPS**
5. **Settings**:
   - **Alternate domain name (CNAME)**:
     - Click **Add item**
     - Enter `eb-clean.hu`
     - Enter `www.eb-clean.hu`
   - **Custom SSL certificate**:
     - Select the certificate created in **Phase 1**
   - **Default root object**:
     - Enter `index.html`
6. Click **Create distribution**.

> Deployment may take **5–15 minutes**.

7. Copy the **Distribution Domain Name**  
   (e.g. `d12345678.cloudfront.net`).

---
