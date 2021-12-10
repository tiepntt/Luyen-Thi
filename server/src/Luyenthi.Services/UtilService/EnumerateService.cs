using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class EnumerateService<T>
    {
        public static Random rng = new Random();
        public static IEnumerable<T> Shuffle(IEnumerable<T> array)
        {
            int n = array.Count();
            return array.OrderBy(x => rng.Next()).ToList(); ;
        }
    }
}
