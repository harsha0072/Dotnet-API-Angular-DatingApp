using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<Member> Members { get; set; }
    public DbSet<Photo> Photos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        var dateTimeConverter = new ValueConverter<DateTime, DateTime>
        (v => v.ToUniversalTime(),
         v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach (var entityTpye in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityTpye.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}
