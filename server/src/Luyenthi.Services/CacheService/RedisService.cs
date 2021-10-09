using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    
    public class RedisService
    {
        private readonly IDistributedCache _distributedCache;
        public RedisService(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }
        public string GetKey(string key)
        {
            var valueKey = _distributedCache.GetString(key);
            if (string.IsNullOrEmpty(key))
            {
                return null;
            }
            return valueKey;
        }
        public void SetKey(string key, string value)
        {
            _distributedCache.SetString(key, value);
        }
    }
    
}
