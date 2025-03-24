# blank

blank

## Attributes

- **Database**: mongodb
- **Storage Adapter**: localDisk

I want to write about this payload fix
https://github.com/payloadcms/payload/issues/8463
https://github.com/vercel/next.js/pull/68812
https://github.com/upleveled/next-js-example-spring-2024-atvie/pull/11/files


# When installing payloadcms on prod check this thing
1. Check .env NEXT_PUBLIC_URL is set to the right url
2. Add a cloud provider for images at least set it up even if you don't have images or uploads, or disable uplaods in controller in that case otherwise payload with give errors accessing admin https://github.com/SyedMuzamilM/payload-cloudinary
3. Adda default email provider for payload https://payloadcms.com/docs/email/overview
