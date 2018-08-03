using dockerdemonetcoreapi.Core;
using dockerdemonetcoreapi.Core.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace dockerdemonetcoreapi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc(options =>
      {
        options.Filters.Add(typeof(ValidateModelState));
      });

      services.AddCors(options => {
        options.AddPolicy("AllowSpecificOrigin",
            builder =>
            {
              builder
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
            });
      });
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors("AllowSpecificOrigin");

      app.UseMiddleware(typeof(ExceptionHandlingMiddleware));

      app.UseMvc();
    }
  }
}