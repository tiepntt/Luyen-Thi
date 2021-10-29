using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Google.Apis.Docs.v1.Data;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Services.Settings;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class CloudinarySerivce
    {
       
        public CloudinarySerivce()
        {
            
            
        }
        public static Cloudinary GetService()
        {
            Account account = new Account();
            using (var stream =
                new StreamReader("Credentials/Cloundinary/account.json"))
            {
                string json = stream.ReadToEnd();
                account = JsonConvert.DeserializeObject<Account>(json);
            }
             var _cloudinary = new Cloudinary(account);
            return _cloudinary;
        }
        public static async Task<ImageUploadResult> UploadImage(Cloudinary cloudinary, byte[] bytes,string folder, string name = null)
        {
            var _webClient = new WebClient();
            var md5 = new MD5CryptoServiceProvider();
            Stream stream = new MemoryStream(bytes);
            
            byte[] imageHash = md5.ComputeHash(bytes);
            string imageName = string.Join("", imageHash.Select(i => i.ToString("X2"))).ToLower();
            if (name != null)
            {
                imageName = name;
            }

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imageName, stream),
                PublicId = imageName, 
                Folder = folder
            };
            var uploadResult =await cloudinary.UploadAsync(uploadParams);
            return uploadResult;
        }
        public static async Task<ImageDto> DownLoadImageFromDoc(Cloudinary cloudinary,InlineObject inlineObject)
        {
            try
            {
                var _webClient = new WebClient();
                var md5 = new MD5CryptoServiceProvider();
                string imageUri = inlineObject.InlineObjectProperties.EmbeddedObject.ImageProperties.ContentUri;
                double Width = (double)inlineObject.InlineObjectProperties.EmbeddedObject.Size.Width.Magnitude;
                double Height = (double)inlineObject.InlineObjectProperties.EmbeddedObject.Size.Height.Magnitude;
                string Id = inlineObject.ObjectId;

                byte[] imageBytes = _webClient.DownloadData(imageUri);

                byte[] imageHash = md5.ComputeHash(imageBytes);
                string name = Convert.ToBase64String(imageBytes);
                string imageName = string.Join("", imageHash.Select(i => i.ToString("X2"))).ToLower();
                Stream stream = new MemoryStream(imageBytes);
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imageName, stream),
                    PublicId = imageName,
                    Folder = CloudinarySetting.FolderQuestion
                };
                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                return new ImageDto
                {
                    Id = Id,
                    Height = (int)(Height * 1.5),
                    Width = (int)(Width * 1.5),
                    Url = uploadResult.SecureUrl.AbsoluteUri
                };
            }
            catch
            {
                return new ImageDto { };
            }
        }
    }
}
