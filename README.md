# EB-Clean

- nagyobb logo, ami atnyulik a meusavon (Manjaro page)
- szeles card kompoensek (kde plasma page)

# Domain registration
Local Hungarian Registrars (Recommended for best pricing):

ATW.hu: Very popular and cost-effective (approx. 400–1,500 HUF).

Rackhost.hu: Modern interface and widely used by developers in Hungary.

DotRoll: Another major player with a solid API and management panel.


2. How to connect it to AWS (The Developer Workflow)
Once you have bought the domain, you don't have to use the registrar's basic DNS tools. You can bridge it to AWS Route 53 in three steps:

Step A: Create a Hosted Zone in AWS
Go to Route 53 console -> Hosted Zones -> Create Hosted Zone.

Enter eb-clean.hu and click Create.

AWS will generate 4 Name Servers (NS records). Copy these down (e.g., ns-123.awsdns-01.com.).

Step B: Update the Registrar
Log in to your registrar (e.g., Rackhost or ATW).

Find the "Name Server" or "DNS Management" section for your domain.

Replace their default name servers with the 4 AWS Name Servers you just copied.

Step C: Connect your S3/Music Logic
Now that AWS controls the DNS, you can point your domain to your S3 content (if you decide to host a site) or simply create records for other services:

A Record (Alias): Point eb-clean.hu to a CloudFront distribution (best for large files).

CNAME: Point subdomains to specific endpoints.
