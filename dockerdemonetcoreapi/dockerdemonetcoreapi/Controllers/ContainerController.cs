using System;
using System.Collections.Generic;
using System.Linq;
using dockerdemonetcoreapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Nest;

namespace dockerdemonetcoreapi.Controllers
{
  [Route("api/[controller]")]
  public class ContainerController : Controller
  {
    private static ElasticClient _client;

    public ContainerController(IConfiguration configuration)
    {
      var elasticSearchUri = Environment.GetEnvironmentVariable("ELASTICSEARCH_URL");

      var connectionSettings = new ConnectionSettings(new Uri(elasticSearchUri))
          .DefaultIndex("containers");

      _client = new ElasticClient(connectionSettings);
    }

    [HttpGet]
    public IActionResult Get()
    {
      var searchResponse = _client.Search<Container>(s => s.MatchAll());

      if (searchResponse.Hits.Count > 0)
      {
        var containers = searchResponse.Hits.Select(h => h.Source);

        return Ok(containers);
      }

      return Ok(new List<Container>());
    }

    [HttpPost]
    public IActionResult Post([FromBody]Container container)
    {
      container.Id = Guid.NewGuid();

      var response = _client.IndexDocument(container);
      if (response.IsValid)
      {
        return Ok();
      }

      return StatusCode(500, response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
      var request = new DeleteRequest<Container>("containers", "container", id);

      var response = _client.Delete(request);
      if (response.IsValid)
      {
        return Ok();
      }

      return StatusCode(500, response);
    }
  }
}
