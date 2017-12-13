using System.Linq;

namespace DAROVAapp.Business.Interfaces.Repositories
{
    public interface IGenericRepository<T>
    {
        IQueryable<T> GetAll();

        T GetById(string id);

        void Insert(T entity);

        void Delete(T entity);

        void Delete(string id);

        void Update(T entityToUpdate);
    }
}

