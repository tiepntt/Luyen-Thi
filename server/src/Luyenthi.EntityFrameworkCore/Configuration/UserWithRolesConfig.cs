using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class UserWithRolesConfig : IEntityTypeConfiguration<IdentityUserRole<Guid>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserRole<Guid>> builder)
        {
            IdentityUserRole<Guid> iur = new IdentityUserRole<Guid>
            {
                RoleId = new Guid(RoleConfiguration.adminRoleId),
                UserId = new Guid(AdminConfiguration.adminId),
            };
            builder.HasData(iur);
        }
    }
}
