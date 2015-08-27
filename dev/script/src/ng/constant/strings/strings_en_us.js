var LMApp_conditionalLoadList = LMApp_conditionalLoadList || [];

LMApp_conditionalLoadList.push({
		"type": "constant",
		"condition": "cookie",
		"cookie": "lang",
		"value": "en_us",
		fn: function () {
			LMApp.constant("STRINGS", {
				CORE: {
					HEADER: {
						TITLE: "LAYTON MILLER",
						SUBTITLE: "Web Architect, Team Leader"
					},
					NAVIGATION: {
						TECHNICAL_SUMMARY: "Technical Summary",
						EXPERIENCE: "Experience",
						PORTFOLIO: "Portfolio",
						CONTACT: "Contact"
					}
				},

				TECHNICAL_SUMMARY: {
					HEADER:{
						TITLE: "TECHNICAL SUMMARY",
						DESCRIPTION: "Pecus virtus qui validus ullamcorper utrum. Oppeto mos ullamcorper erat exerci cogo aliquam vero adsum te patria."
					},
					SUMMARY_GROUPS:{
						LANGUAGES: {
							TITLE: "Languages",
							ITEMS: {
								JAVASCRIPT: {
									NAME: "Javascript",
									TOOLTIP: "Javascript is my bread and butter. I have very solid skills in application building both from scratch as well as from frameworks such as AngularJS."
								},
								HTML: {
									NAME: "HTML",
									TOOLTIP: "While HTML is typically easy for developers to grasp as a concept, writing good, semantic markup that performs for SEO and simultaneously enhances ease of developments across devices is not. As an architect, I pride myself in my skill to see a design's markup pitfalls before I build it."
								},
								CSS: {
									NAME: "CSS",
									TOOLTIP: "CSS architecture is as important as HTML architecture because it has effects on efficiency, maintainability, and functionality in legacy browsers. I have spent my career becoming intimately acquainted with CSS and pride myself in elegant solutions that are cross-browser compatible."
								},
								PHP: {
									NAME: "PHP",
									TOOLTIP: "As a full-stack developer I have led the tech effort for multiple successful startups. I have used PHP as a back-end solution on many successful projects."
								}
							}
						},
						TECHNOLOGIES: {
							TITLE: "Technologies",
							ITEMS: {
								GRUNT: {
									NAME: "Grunt",
									TOOLTIP: "Grunt has become one of the de-facto standards for front end development. I have embraced it fully and have even provided the national Razorfish team with a new standard recommendation on Grunt usage process."
								},
								HANDLEBARS: {
									NAME: "Handlebars",
									TOOLTIP: "Handlebars has helped me deliver both statically generated as well as Javascript driven solutions for major clients such as Intel and Microsoft. In fact, at the time of this writing, all global components for the Intel.com global initiative were generated out of a library that I architected!"
								},
								ANGULARJS: {
									NAME: "AngularJS",
									TOOLTIP: "Production projects using AngularJS are both extensible and maintainable. The Microsoft Band online dashboard is a good example of a project where I took a lead architectural role in both its design and development."
								}
							}
						}
					}
				},

				EXPERIENCE: {
					HEADER: {
						TITLE: "Experience",
						DESCRIPTION: "Here is a timeline of my employment, from today back to when I started. Feel free to explore! Swipe, drag, or mouse-wheel to navigate across the timeline."
					},
					EVENTS:{
						DESIGN_MILL: {
							NAME: "Design Mill"
						},
						YACHT_VID: {
							NAME: "Yacht Vid"
						},
						MUTUAL_AUTO_MEDIA: {
							NAME: "Mutual Auto Media"
						},
						GLOBANT: {
							NAME: "Globant"
						},
						RAZORFISH: {
							NAME: "Razorfish"
						}
					}
				},

				TIMELINE: {
					TODAY: "Today",
					MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
				}
			});
		}
	}
);