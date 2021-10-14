using System.ComponentModel.DataAnnotations;

namespace Luyenthi.Core.Dtos
{
    public class UserResetPassword
    {
        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; }

        [Required]
        [MinLength(8)]
        public string ConfirmPassword { get; set; }
    }
}
