using System.ComponentModel.DataAnnotations;

namespace Luyenthi.Core.Dtos
{
    public class UserForgetPassword
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
