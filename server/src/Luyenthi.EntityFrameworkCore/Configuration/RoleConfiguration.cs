using Luyenthi.Core.Enums.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole<Guid>>
    {
        public static string adminRoleId = "daf39ce6-9c5f-495e-af95-810df7f64e40";
        public static string teacherRoleId = "f25e6a5a-2ce9-4273-9bd3-3b71755add19";
        public static string studentRoleId = "fcdea3ce-afe0-4fff-b32c-6c28309ec12e";
        public void Configure(EntityTypeBuilder<IdentityRole<Guid>> builder)
        {
            builder.HasData(
                new IdentityRole<Guid>
                {
                    Name = Role.Admin,
                    Id = new Guid(adminRoleId),
                    NormalizedName=Role.Admin.ToUpper()
                },
                new IdentityRole<Guid>
                {
                    Name = Role.Teacher,
                    Id = new Guid(teacherRoleId),
                    NormalizedName = Role.Teacher.ToUpper(),
                   
                },
                new IdentityRole<Guid>
                {
                    Name = Role.Student,
                    Id = new Guid(studentRoleId),
                    NormalizedName = Role.Student.ToUpper()
                }
                ); ;
        }
    }
}
