using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class CloudinarySerivce
    {
        private Cloudinary _cloudinary;
        public CloudinarySerivce()
        {
            _cloudinary = new Cloudinary(new Account {Cloud= "nguyentiep", ApiKey= "458933818533949", ApiSecret= "X26joMtt0oOXoYqjj87l13gIzR8" });
        }
        public async Task<ImageUploadResult> UploadImage(byte[] bytes)
        {
            //var file = new ImageUploadParams
            //{
            //    File= new FileDescription()
            //};
            //var result = await _cloudinary.UploadAsync()
            //return result;
            return null;
        }
    }
}
