using System;
using System.Text;

namespace Luyenthi.Services
{
    public class MutationService
    {
        private static readonly Random _random = new();

        private static string RandomString(int size, bool loweCase = false)
        {
            var builder = new StringBuilder(size);
            char offset = loweCase ? 'a' : 'A';
            const int lettersOffset = 26;
            for (int i = 0; i < size; i++)
            {
                var @char = (char)_random.Next(offset, offset + lettersOffset);
                builder.Append(@char);
            }
            return loweCase ? builder.ToString().ToLower() : builder.ToString().ToUpper();
        }

        public static string GeneratePassword()
        {
            return RandomString(8, true);
        }
        public static string GenerateActiveCode()
        {
            return RandomString(6, false);
        }
        public static string GenerateIndexUser(int size)
        {
            var builder = new StringBuilder(size);
            char offset = '0';
            const int lettersOffset = 9;
            for (int i = 0; i < size; i++)
            {
                var @char = (char)_random.Next(offset, offset + lettersOffset);
                builder.Append(@char);
            }
            return builder.ToString().ToLower();
        }
    }
}
