using AutoMapper;
using DAROVAapp.Models;

namespace DAROVAapp.Business.Initialization
{
    public class AutoMapperProfileConfiguration : Profile
    {
        public AutoMapperProfileConfiguration() : this("MyProfile")
        {
        }

        public AutoMapperProfileConfiguration(string profileName) : base(profileName)
        {
            CreateMap<ApplicationUser, UserViewModel>();
            CreateMap<UserViewModel, ApplicationUser>();
        }
    }
}
