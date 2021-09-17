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
    public class FileDto
    {
        public string Path { get; set; }
        public string Folder { get; set; }
    }
    public class FileService
    {
        public WebClient _webClient { get; set; }
        public FileService()
        {
            _webClient = new WebClient();
        }
        public FileDto Upload()
        {
            return new FileDto { };
        }

        public async Task<FileDto> Save(byte[] bytes, string name, string FolderPath)
        {
            if (!Directory.Exists(FolderPath))
            {
                Directory.CreateDirectory(FolderPath);
            }
            await File.WriteAllBytesAsync(name, bytes);
            return new FileDto { };
        }
        public async Task<byte[]> Download(string Uri)
        {
            byte[] bytes = await _webClient.DownloadDataTaskAsync(Uri);
            return bytes;
        }
        public async Task<ImageDto> DownLoadImageFromDoc(InlineObject inlineObject)
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
            await File.WriteAllBytesAsync("file.png", imageBytes);
            return new ImageDto
            {

            };
        }
    }
}
