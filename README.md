## Ryan Schaul README

## Explain any decisions you made when working on the assignment. (Trade-offs or other considerations.)
- The text for the email label is a little heavier font weight than the other input fields. I assumed this was a small error in the design file and not something I should replicate.
- No color was specified for the white text within the green success message. I used #fff because a standard white was used at one other point in the design; I assumed using a standard white again was ok.
- The project is not perfect, there are some spots in the code I do not love. Although not bad, the functional/logical code design could be a little cleaner, and the code design and CSS for presentational purposes could be structured a little cleaner as well. Given time constraints, I chose the current implementations. For responsiveness, anything less wide than about 200px is where I stopped; maybe there's a screen size out there smaller than that but it seemed fine. I could just add another media query and make a few more changes if so.
- I considered click handlers for the little red error marks. In other words, I considered allowing users to "click-away" individual error messages, since an "x" sometimes indicates a clickable element. However, that functionality was not specified, and that functionality does not seem to make sense. The error line items go away when the correction is made which provides nice feedback to the user when they've entered input that is satisfactory. I assumed this was an acceptable implementation.
- Although I've prevented it with frontend input validation, I did notice that technically the API will accept a submission without a region even while the country is the United States or Canada. I just thought I would mention it.
- I was a little confused, at first, by the logic in the useEffect hook within the Index.js page. It is trying to submit a POST request to the `/api/form` endpoint once after the initial component renders. The request is malformed and is throwing an error in the console. I could not figure out why this functionality was written, i.e. why one would want to try and submit the form immediately after the inital render cycle. At first, I considered whether you wanted me to try and do the form submission there but that does not seem to make sense; the form should be submitted when the user clicks the submit button. I left that useEffect code in Index.js alone. In a real-life situation I absolutely would have asked a question about this; I'm not sure why I didn't here.
- My error handling is handling both 400s and 500s. In either case, the visual for the user is the same. This seems fine to me but I did consider whether I ought to have differnt visuals for each. My input validation should be protecting against the submission of a bad data payload. However, theoretically, it is possible a user could manage to submit bad data if they were motivated to get around it. Of course, that is why backend validation is always a good idea, which I know was not my task here. My only point is that I considered the possibility of displaying unique visuals depending on whether the error was a 400 or 500. I chose not to because given the frontend validation, only 500s should realistically occur and regardless, the visual is proper for either case (if the user gets around the frontend validation, they'll know what they have done).
- Regarding the data in countryRegionSelect.json, the shortcodes do not seem to be used by this task. I assumed this was expected and ok.
- I had never spent much time with letter spacing. The design document called for 2% letter spacing on the submit button text. I believe 0.02em is the corresponding equivalent.
- The color of the arrows within the select elements were not specified but they look like color-accent-light to me.
- My arrows in the select elements are slightly different than the design document. I asked about this and the other icons in the Gatsby Slack channel for my project but Flo said not to worry too much about these. In summary, I could not quite locate an exact match for those arrows.
- Given the time constraints, the testing suite is not comprehensive. I have included a small sampling of some potential tests.

## What are some questions you would ask the designer about this design?
- I asked Flo a couple questions over Slack. They had to do with some of the design language/specs and the use of emojis.
- In real life, I would probably have a conversation with the designer and leave it a little open-ended to see whay they say. In other words, to see what it is they would like me to know. From there, I would make sure I understood if there was anything else that was especially important to them, or perhaps slightly more expendable. For purposes of this assignment, I treated everything as non-expendable. To be clear, I think that's the default assumption, but it is nice to have a conversation. For example, when asked about it here, Flo said the emojis were basically unimportant. In another situation, they could potentially be very important. It just all depends on circumstance and facts I may not be aware of, hence the need to communicate.

## We are always looking to improve our interviewing process! Please let us know what your experience was completing this project.
- The instructions included a list of additional tasks from which to include just one, like adding additional styling or writing the code in TypeScript. I did not think the 4-6 hours allowed time for an additional task beyond what the project required (including testing). I had not looked into form accessiblity much before so I spent a half hour reading about that and the form as created seems to be fairly accessible; everything is labeled and capable of being navigated with the keyboard and without the mouse.
- Nothing to add here at this time except that it was a fun project.


## Guidelines

- This exercise should take you 4-6 hours to complete
  - They don’t need to be consecutive hours, and we won’t be timing you! This is simply a guideline.
- We recognize this time frame might not let you be as comprehensive as you’d like. That’s okay!

## Requirements

For this exercise, you will implement the sign-up flow based on a set of provided designs. The zip folder for the project is available at [https://drive.google.com/drive/folders/1M4wIUtPAlktGpi-Tg0h6JH1UsUYe8_7s]. (Designs for both desktop and mobile views can be found in the /designs folder).

Your engineering team has already been provided an API endpoint where form data can be posted. The Additional Docs section includes more information about how the endpoint works. For this exercise, you'll only be building the frontend that communicates with the API endpoint. (You won't need to make any additional changes to the API itself.)

Your implementation should meet the following requirements:

- Post your form data to the API provided (see Additional Docs below).
- Work at all screen sizes, including the desktop and mobile views provided in the designs.
- Gracefully handle any errors that come back from the API.
- Include automated tests for your implementation.
- Choose **_only one_** of the following requirements:
  - Add some additional styling to the existing designs.
  - Improve the accessibility of your form.
  - Write your code in TypeScript.
  - Do something else that shows off your skills! (If you choose this option, explain in your README why this is a valuable addition.)

Along with your code submission, please include a **brief** README to cover the following:

- Explain any decisions you made when working on the assignment. (Trade-offs or other considerations.)
- What are some questions you would ask the designer about this design?
- We are always looking to improve our interviewing process! Please let us know what your experience was completing this project. (Your answer here won't count for/against you, but we'll use your feedback to make improvements to this assignment.)
  - Was the scope too large to finish within the given time requirement? Was it not large enough? Are there any improvements we could make the prompt easier to understand?

Your goal is to finish as much of this as you can in the time that you have!

## Additional Docs

- [Form submission API endpoint](#form-submission-api-endpoint)
- [Countries and regions](#countries-and-regions)
- [Testing conventions](#testing-conventions)

### Form submission API endpoint

Your engineering team has already built an endpoint (**/api/form**) that you can use to submit form data. To submit form data, you can make a POST request to the endpoint. Unfortunately, the form endpoint isn't super reliable. Sometimes, things go wrong on the server, and requests will return a 500 error code. In that case, the response will look something like this:

### Countries and regions

The project code includes a JSON file (**src/data/countryRegionSelect.json**) that contains all the countries to be included in the Country dropdown.

Some of the countries will also require an additional Region field:

- If the country is USA, the Region dropdown should list the U.S. states.
- If the country is Canada, the Region dropdown should list the Canadian provinces.
- If the country is something else, the Region dropdown should not display.

The available states and provinces can also be found in the **src/data/countryRegionSelect.json** file.

### Testing conventions

The project is already set up to use Jest. If you decide to add automated tests for your form, look at the **src/tests/layout.test.js** file for an example of how to use the testing framework.
