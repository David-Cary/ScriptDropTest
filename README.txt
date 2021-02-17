
What was the hardest part of the implementation?

Probably the daily orders API.  The actual coding was easy enough, but working out the logic so I wasn't duplicating code when doing the lookup for a courier vs a pharmacy took some thinking.

What would be your next couple of tasks if you had more time?

The next item on the docket was getting the unit test for components up, with the company view (log in testing), add order pane, and daily orders pane being highest priority.  The last 2 were chosen as those are the workhorses of the pharmacy and client views.  I had actually started working on testing those using vue jest, but was running into error about a library not being found, so figured it was better to roll that back and tidy this up rather than go over time.

Stronger authentication would be the highest priority for a release.  I did add a password system so user can't modify each other's orders by just knowing their names, but there's nothing keeping someone from making changes with the right url request.  I wouldn't be comfortable actually releasing this to clients without covering that vulnerability.

Speaking of which, the password for each company is currently set to it's abbreviation.  I know that wasn't provided in the seed information, but it is a standard log in feature that makes client data more secure so I felt it was a justified addition.

How could we change the project to be more interesting?

Switching from just showing today's orders to being able to view orders by day would be a useful and relatively lightweight addition.  Being able to look up past orders seems like the kind of thing a company would want to be able to do for records purposes.  Being able to look ahead at upcoming orders could be helpful for couriers when trying to determine workload and scheduling.

I did also consider allowing a company to be both a pharmacy and a courier, but I don't know if there are any business restrictions or other practical reasons you wouldn't have that.
