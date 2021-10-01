using Luyenthi.Domain;
using Luyenthi.Domain.Base;
using Luyenthi.Domain.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;

namespace Luyenthi.EntityFrameworkCore
{
    public class LuyenthiDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DbSet<Question> Questions { get; set; }
        public DbSet<QuestionSet> QuestionSets { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<LevelQuestion> LevelQuestions { get; set; }

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
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // tạo data khi thiết lập
            base.OnModelCreating(builder);
            EntityConfiguration(builder);
            RelationShipConfiguration(builder);

            // relation ship
        }
        private void EntityConfiguration(ModelBuilder builder)
        {
            builder.Entity<Grade>(e => {
                e.HasIndex(i => i.Code).IsUnique();
            });
            builder.Entity<Subject>(e => {
                e.HasIndex(i => i.Code).IsUnique();
            });
            builder.Entity<Chapter>(e => {
                e.HasIndex(i => i.Code).IsUnique();
            });
            builder.Entity<Unit>(e => {
                e.HasIndex(i => i.Code).IsUnique();
            });
            builder.Entity<LevelQuestion>(e => {
                e.HasIndex(i => i.Code).IsUnique();
            });
            builder.Entity<Question>(b =>
            {
                b.Property(x => x.Introduction).HasConversion(
                       v => JsonConvert.SerializeObject(v as object),
                       v => JsonConvert.DeserializeObject<List<ExpandoObject>>(v)
                   );
                b.Property(x => x.Content).HasConversion(
                    v => JsonConvert.SerializeObject(v as object),
                     v => JsonConvert.DeserializeObject<List<ExpandoObject>>(v)
                );
                b.Property(x => x.Solve).HasConversion(
                    v => JsonConvert.SerializeObject(v as object),
                     v => JsonConvert.DeserializeObject<List<ExpandoObject>>(v)
                );
                b.Property(x => x.Solve).HasConversion(
                    v => JsonConvert.SerializeObject(v as object),
                     v => JsonConvert.DeserializeObject<List<ExpandoObject>>(v)
                );
                b.HasMany(x => x.SubQuestions).WithOne(x => x.Parent)
                .OnDelete(DeleteBehavior.Cascade);
            });
            
        }
        public void RelationShipConfiguration(ModelBuilder builder)
        {
            builder.SharedTypeEntity<QuestionSetQuestion>("QuestionSetQuestion");
            builder.Entity<QuestionSet>()
               .HasMany(b => b.Questions)
               .WithMany(x => x.QuestionSets)
               .UsingEntity<QuestionSetQuestion>(
                   "QuestionSetQuestion",
                   j => j.HasOne<Question>().WithMany().HasForeignKey("QuestionId"),
                   j => j.HasOne<QuestionSet>().WithMany().HasForeignKey("QuestionSetId")
                   );

            builder.SharedTypeEntity<GradeSubject>("GradeSubjects");
            builder.Entity<Subject>()
                   .HasMany(b => b.Grades)
                   .WithMany(b => b.Subjects)
                   .UsingEntity<GradeSubject>(
                        "GradeSubjects",
                        b => b.HasOne<Grade>().WithMany().HasForeignKey("GradeId"),
                        b => b.HasOne<Subject>().WithMany().HasForeignKey("SubjectId")
                   );

            //builder.ApplyConfiguration(new RoleConfiguration());
            //builder.ApplyConfiguration(new AdminConfiguration());
            //builder.ApplyConfiguration(new UserWithRolesConfig());

        }
        private void SeedGradeAndSubject(ModelBuilder builder)
        {
            // seeding project
            
            //builder.Entity<GradeSubject>().HasData(gradeSubjects);

        }
    }
}
