using Luyenthi.Domain.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class AdminConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public static string adminId = "cb3850a2-0a32-4cee-a175-08df5ec6169b";
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            var admin = new ApplicationUser
            {
                Id = new Guid(adminId),
                UserName = "admin",
                FirstName = "Tiệp",
                LastName = "Nguyễn",
                Email = "Admin@Admin.com",
                PhoneNumber = "0819200620",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                BirthDay = new DateTime(1980, 1, 1),
            };

            admin.PasswordHash = PassGenerate(admin);
            builder.HasData(admin);
        }
        public string PassGenerate(ApplicationUser user)
        {
            var passHash = new PasswordHasher<ApplicationUser>();
            return passHash.HashPassword(user, "123qwe");
        }
    }
}
