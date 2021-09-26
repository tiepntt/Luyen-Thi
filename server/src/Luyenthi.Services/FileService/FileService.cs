using Google.Apis.Docs.v1.Data;
using Luyenthi.Core.Dtos.GoogleDoc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


namespace Luyenthi.Services
{
    public class FileDto
    {
        public string Path { get; set; }
        public string Folder { get; set; }
    }
    public class FileService
    {
        public WebClient _webClient { get; set; }
        private string HostName { get; set; }
        private readonly IHttpContextAccessor _httpContextAccessor;
        public FileService(IHttpContextAccessor httpContextAccessor)
        {
            _webClient = new WebClient();
            _httpContextAccessor = httpContextAccessor;
            HostName =$"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host.Value}";
        }
        public FileDto Upload()
        {
            return new FileDto { };
        }

        public async Task<FileDto> Save(byte[] bytes, string name, string FolderPath,string path)
        {
            if (!Directory.Exists(FolderPath))
            {
                Directory.CreateDirectory(FolderPath);
            }
            await File.WriteAllBytesAsync(name, bytes);
            var pathFile = path.Replace("\\", "/");
            return new FileDto {
                Path= $"{HostName}/{pathFile}", 
                Folder=FolderPath
            };
        }
        public async Task<byte[]> Download(string Uri)
        {
            byte[] bytes = await _webClient.DownloadDataTaskAsync(Uri);
            return bytes;
        }
        public async Task<ImageDto> DownLoadImageFromDoc(InlineObject inlineObject, string folderPath,string folder)
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
                var filePath = Path.Combine(folderPath, $"{imageName}.png");
                var path = Path.Combine(folder, $"{imageName}.png");
                var image = await Save(imageBytes, filePath, folderPath, path);
                return new ImageDto
                {
                    Id=Id,
                    Height = (int)Height,
                    Width = (int)Width,
                    Url= image.Path
                };
            }
            catch
            {
                return new ImageDto { };
            }
        }
    }
}
