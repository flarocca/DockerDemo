using System;
using System.ComponentModel.DataAnnotations;

namespace dockerdemonetcoreapi.Models
{
  public class Container
  {
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Container name is required.")]
    [MinLength(5, ErrorMessage = "Container name must contain ar least five characters.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Container image is required.")]
    [MinLength(5, ErrorMessage = "Container image must contain ar least five characters.")]
    public String Image { get; set; }
  }
}
