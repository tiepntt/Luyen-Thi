using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Google.Apis.Docs.v1.Data;
using Luyenthi.Core.Dtos.GoogleDoc;
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
        private Cloudinary _cloudinary;
        public WebClient _webClient { get; set; }
        public CloudinarySerivce()
        {
            _webClient = new WebClient();
            _cloudinary = new Cloudinary(new Account {Cloud= "nguyentiep", ApiKey= "458933818533949", ApiSecret= "X26joMtt0oOXoYqjj87l13gIzR8" });
        }
        public async Task<ImageUploadResult> UploadImage(byte[] bytes)
        {
            var md5 = new MD5CryptoServiceProvider();
            Stream stream = new MemoryStream(bytes);
            
            string name = Convert.ToBase64String(bytes);
            byte[] imageHash = md5.ComputeHash(bytes);
            string imageName = string.Join("", imageHash.Select(i => i.ToString("X2"))).ToLower();
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imageName, stream),
                PublicId = imageName, 
                Folder ="Luyenthi"
            };
            var uploadResult =await _cloudinary.UploadAsync(uploadParams);
            return uploadResult;
        }
        public async Task<ImageDto> DownLoadImageFromDoc(InlineObject inlineObject)
        {
            try
            {
                var md5 = new MD5CryptoServiceProvider();
                string imageUri = inlineObject.InlineObjectProperties.EmbeddedObject.ImageProperties.ContentUri;
                double Width = (double)inlineObject.InlineObjectProperties.EmbeddedObject.Size.Width.Magnitude;
                double Height = (double)inlineObject.InlineObjectProperties.EmbeddedObject.Size.Height.Magnitude;
                string Id = inlineObject.ObjectId;

                byte[] imageBytes = _webClient.DownloadData(imageUri);
                string name = Convert.ToBase64String(imageBytes);
                byte[] imageHash = md5.ComputeHash(imageBytes);
                string imageName = string.Join("", imageHash.Select(i => i.ToString("X2"))).ToLower();
                Stream stream = new MemoryStream(imageBytes);
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imageName, stream),
                    PublicId = imageName,
                    Folder = "Luyenthi/Questions"
                };
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                return new ImageDto
                {
                    Id = Id,
                    Height = (int)Height,
                    Width = (int)Width,
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
