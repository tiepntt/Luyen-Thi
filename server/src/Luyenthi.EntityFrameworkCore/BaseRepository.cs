using Luyenthi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Luyenthi.EntityFrameworkCore
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly LuyenthiDbContext Context;

        protected DbSet<TEntity> Entities;


        /// <summary>
        /// Initializes a new instance of the <see cref="BaseRepository{TEntity}"/> class.
        /// Note that here I've stored Context.Set<TEntity>() in the constructor and store it in a private field like _entities.
        /// This way, the implementation  of our methods would be cleaner:        ///
        /// _entities.ToList();
        /// _entities.Where();
        /// _entities.SingleOrDefault();
        /// </summary>
        public BaseRepository(LuyenthiDbContext context)
        {
            Context = context;
            Entities = Context.Set<TEntity>();
        }

        /// <summary>
        /// Gets the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public virtual TEntity Get(Guid id)
        {
            // Here we are working with a DbContext, not specific DbContext.
            // So we don't have DbSets we need to use the generic Set() method to access them.
            return Entities.Find(id);
        }

        /// <summary>
        /// Gets all.
        /// </summary>
        /// <returns></returns>
        public IQueryable<TEntity> GetAll()
        {
            return Entities;
        }

        /// <summary>
        /// Finds the specified predicate.
        /// </summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns></returns>
        public IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate);
        }
        public int Count(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate).Count();
        }
        public TEntity FindOne(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate).FirstOrDefault();
        }
        public IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate, int take, int skip)
        {
            return Entities.Where(predicate).Take(take).Skip(skip);
        }

        /// <summary>
        /// Singles the or default.
        /// </summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns></returns>
        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate).SingleOrDefault();
        }

        /// <summary>
        /// First the or default.
        /// </summary>
        /// <returns></returns>
        public TEntity FirstOrDefault()
        {
            return Entities.SingleOrDefault();
        }

        /// <summary>
        /// Adds the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        public void Add(TEntity entity)
        {
            Entities.Add(entity);
            Context.SaveChanges();
        }

        /// <summary>
        /// Adds the range.
        /// </summary>
        /// <param name="entities">The entities.</param>
        public void AddRange(IEnumerable<TEntity> entities)
        {
            Entities.AddRange(entities);
            Context.SaveChanges();
        }

        /// <summary>
        /// Removes the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        public void Remove(TEntity entity)
        {
            Entities.Remove(entity);
            Context.SaveChanges();
        }
        public void RemoveById(Guid id)
        {
            Entities.Remove(Entities.Find(id));
            Context.SaveChanges();
        }

        /// <summary>
        /// Removes the range.
        /// </summary>
        /// <param name="entities">The entities.</param>
        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            Entities.RemoveRange(entities);
            Context.SaveChanges();
        }


        /// <summary>
        /// Removes the Entity
        /// </summary>
        /// <param name="entityToDelete"></param>
        public virtual void RemoveEntity(TEntity entityToDelete)
        {
            if (Context.Entry(entityToDelete).State == EntityState.Detached)
            {
                Entities.Attach(entityToDelete);
            }
            Entities.Remove(entityToDelete);
            Context.SaveChanges();
        }

        /// <summary>
        /// Update the Entity
        /// </summary>
        /// <param name="entityToUpdate"></param>
        public virtual void UpdateEntity(TEntity entityToUpdate)
        {
            Entities.Attach(entityToUpdate);
            Context.Entry(entityToUpdate).State = EntityState.Modified;
            Context.SaveChanges();
        }
       
    }
}
