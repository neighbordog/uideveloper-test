##My approach to the problem

One of my main goals for this project was to create a highly pluggable widget which:

1. is easily extendable
2. and where parts can be reused in similar projects.

###What does this mean?
Assume I have to work on a similar project, for example a widget which aim is to display multiple item.
In this case I can take the main body of widget (which are the loadData and render methods of selz-widget.js) and
customize them so that I can achieve the above mentioned described functionality.

###Testing

I have tested the widget in the following browser:

- Chrome 48
- Firefox 44
- Opera 35
- Safari 9
- Internet Explorer 10
- iOS Safari

Besides that, I wrote several tests with CasperJS based on the briefing to make debugging easier.

##What problems did I face
My main issue while developing this widget was to create dynamic JSONP calls while keeping an object-oriented approach.
This required me to do some research on this topic. But luckily I found some help on Stack Overflow and similar websites that
covered that topic.

Of course I simply could have used jQuery, but decided against it for one main reason:

In a real-world scenario (for example an embeddable widget) a bloated library like jQuery is unnecessary load and should't therefore
be used.

##Inspiration
My main inspiration (besides the provided example) was the item page from Gumroad.

[Gumroad Demo](https://gumroad.com/demo)

I like that every element has its distinct place and that elements that require interaction are clearly visually marked as such, so that the user can understand
the purpose of the UI within seconds.

##Improvement
There are a few things I'd improve if I had more time. One major thing would be proper caching to improve the loading time of the widget and to reduce unnecessary API calls.
