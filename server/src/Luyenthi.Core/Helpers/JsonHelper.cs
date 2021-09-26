using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Helpers
{
    public class JsonHelper<T>
    {
        public static T RemoveNull(dynamic obj)
        {
            var serilaizeJson = JsonConvert.SerializeObject(obj, Formatting.None,
            new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            });

            var result = JsonConvert.DeserializeObject<T>(serilaizeJson);
            return result;
        }
    }
}
