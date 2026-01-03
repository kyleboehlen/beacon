using System.Reflection;
using Features.Rules.Models;

namespace backend.Tests;

public class ReferenceNumberValidationTests
{
    // Start by verifying that the parser works as expected as defined below
    [Fact]
    public void ValidReferenceNumbers_ShouldParseCorrectly()
    {
        // Test the parser with known values
        var testContent = @"
# Test ranges
1.0-1.3
2.3-2.3.6
5.0
";

        var parsed = ReferenceNumberParser.ParseValidReferences(testContent);

        // 1.0-1.3 should expand to 1.0, 1.1, 1.2, 1.3
        Assert.Contains("1.0", parsed);
        Assert.Contains("1.1", parsed);
        Assert.Contains("1.2", parsed);
        Assert.Contains("1.3", parsed);
        
        // 1.0-1.3 shouldn't contain additional values
        Assert.DoesNotContain("1.4", parsed);
        Assert.DoesNotContain("1.1.1", parsed);

        // 2.3-2.3.6 should expand to 2.3, 2.3.1, 2.3.2, 2.3.3, 2.3.4, 2.3.5, 2.3.6
        Assert.Contains("2.3", parsed);
        Assert.Contains("2.3.1", parsed);
        Assert.Contains("2.3.6", parsed);
        Assert.DoesNotContain("2.3.7", parsed);
        Assert.DoesNotContain("2.4", parsed);

        // Single entry
        Assert.Contains("5.0", parsed);

        // Total entries
        Assert.Equal(12, parsed.Count);
    }
    
    [Fact]
    public void AllReferenceNumbers_ShouldBeValid()
    {
        // Read in valid references from txt file
        var validReferencesFile = Path.Combine(AppContext.BaseDirectory, "ValidReferenceNumbers.txt");
        Assert.True(File.Exists(validReferencesFile),
            $"ValidReferenceNumbers.txt not found at {validReferencesFile}");

        var fileContent = File.ReadAllText(validReferencesFile);
        var validReferences = ReferenceNumberParser.ParseValidReferences(fileContent);

        // Fail the test if something went wrong with reading in the valid rule reference ranges
        Assert.NotEmpty(validReferences);

        // Get all ReferenceNumbers from RulesConfig - reference numbers included as default in init
        var invalidReferences = new List<string>();
        var config = new RulesConfig();

        // This gets every property name that is of type RuleOption, RuleOption contains the sub-property for the reference number
        var ruleProperties = typeof(RulesConfig)
            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.PropertyType.IsGenericType &&
                       p.PropertyType.GetGenericTypeDefinition() == typeof(RulesConfig.RuleOption<>));

        // Iterating through every RuleOption in our RulesConfig
        foreach (var property in ruleProperties)
        {
            // Ignore if it has no value
            var ruleOption = property.GetValue(config);
            if (ruleOption == null) continue;

            // Ignore if the property isn't ReferenceNumber
            var refNumberProp = ruleOption.GetType().GetProperty("ReferenceNumber");
            if (refNumberProp == null) continue;
            
            var refNumber = refNumberProp.GetValue(ruleOption) as string;
            // if (string.IsNullOrEmpty(refNumber)) continue; // Enable this line if you want to allow empty strings as valid reference numbers

            // Add to list of invalid numbers if it is not in the collection of valid reference numbers
            if (string.IsNullOrEmpty(refNumber) || !validReferences.Contains(refNumber))
            {
                invalidReferences.Add($"{property.Name}: {refNumber}");
            }
        }

        // Fail test if we have any invalid reference numbers - allows developer to see which rules failed validation
        Assert.Empty(invalidReferences);
    }
}

/*
 * The ReferenceNumberParser handles taking content from ValidReferenceNumbers.txt and expanding the ranges of rules
 * in to all of the valid rules sections. This allows unit tests to validate that strings of reference numbers to the
 * rules are valid sections and prevents broken links.
 */
public static class ReferenceNumberParser
{
    public static HashSet<string> ParseValidReferences(string fileContent)
    {
        var references = new HashSet<string>();
        
        // Get each line of the file, while removing any empty lines
        var lines = fileContent.Split('\n', StringSplitOptions.RemoveEmptyEntries);

        foreach (var line in lines)
        {
            var trimmed = line.Trim();

            // Skip comments and empty lines
            if (string.IsNullOrWhiteSpace(trimmed) || trimmed.StartsWith('#'))
                continue;

            // Check if it's a range (contains '-')
            if (trimmed.Contains('-'))
            {
                ExpandRange(trimmed, references);
            }
            else
            {
                references.Add(trimmed);
            }
        }

        return references;
    }

    private static void ExpandRange(string range, HashSet<string> references)
    {
        // Verify we have the start and end of the range
        var parts = range.Split('-', 2);
        if (parts.Length != 2)
            return;

        var start = parts[0].Trim();
        var end = parts[1].Trim();

        var startParts = start.Split('.');
        var endParts = end.Split('.');

        // Handle ranges like "1.0-1.3"
        if (startParts.Length == 2 && endParts.Length == 2)
        {
            var major1 = int.Parse(startParts[0]); // "i.3-2.3.6"
            var minor1 = int.Parse(startParts[1]); // "2.i-2.3.6"
            var major2 = int.Parse(endParts[0]); // "2.3-i.3.6"
            var minor2 = int.Parse(endParts[1]); // "2.3-2.i.6"

            // This check prevents an infinite loop
            if (major1 == major2)
            {
                for (int i = minor1; i <= minor2; i++)
                {
                    references.Add($"{major1}.{i}");
                }
            }
        }
        
        // Handle ranges like "2.3-2.3.6"
        if (startParts.Length == 2 && endParts.Length == 3)
        {
            var major1 = int.Parse(startParts[0]); // "i.3-2.3.6"
            var minor1 = int.Parse(startParts[1]); // "2.i-2.3.6"
            var major2 = int.Parse(endParts[0]); // "2.3-i.3.6"
            var minor2 = int.Parse(endParts[1]); // "2.3-2.i.6"
            var sub2 = int.Parse(endParts[2]); // "2.3-2.3.i"

            // Prevent infinite loop. We don't support ranges like "2.3-2.4.7"
            if (major1 == major2 && minor1 == minor2)
            {
                // Add the start without subsection
                references.Add($"{major1}.{minor1}");

                // Add all subsections from 1 to end
                for (int i = 1; i <= sub2; i++)
                {
                    references.Add($"{major1}.{minor1}.{i}");
                }
            }
        }
        
        // We do not support ranges like "2.3.1-2.3.7"
    }
}