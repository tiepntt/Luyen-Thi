using Luyenthi.Domain.Base;
using Luyenthi.Domain.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace Luyenthi.EntityFrameworkCore
{
    public class LuyenthiDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public LuyenthiDbContext(DbContextOptions<LuyenthiDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            this._httpContextAccessor = httpContextAccessor;
        }
        public override int SaveChanges()
        {
            var now = DateTime.Now;
            var currentUser = _httpContextAccessor.HttpContext.Items["User"] as ApplicationUser;
            Guid? currentUserId = currentUser != null ? (Guid?)currentUser.Id : null;
            foreach (var changedEntity in ChangeTracker.Entries())
            {
                if (changedEntity.Entity is IBaseEntity entity)
                {
                    switch (changedEntity.State)
                    {
                        case EntityState.Added:
                            entity.CreatedAt = now;
                            entity.UpdatedAt = now;
                            entity.CreatedBy = currentUserId;
                            entity.UpdatedBy = currentUserId;
                            break;
                        case EntityState.Modified:
                            Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                            Entry(entity).Property(x => x.CreatedAt).IsModified = false;
                            entity.UpdatedAt = now;
                            entity.UpdatedBy = currentUserId;
                            break;
                    }
                }
            }

            return base.SaveChanges();
        }
    }
}
