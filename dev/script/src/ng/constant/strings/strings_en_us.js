var LMApp_conditionalLoadList = LMApp_conditionalLoadList || [];

LMApp_conditionalLoadList.push({
		"type": "constant",
		"condition": "cookie",
		"cookie": "lang",
		"value": "en_us",
		fn: function () {
			LMApp.constant("STRINGS", {
				CORE: {
					LANGUAGE: "en_us",
					HEADER: {
						TITLE: "LAYTON MILLER",
						SUBTITLE: "Web Architect, Team Leader"
					},
					NAVIGATION: {
						TECHNICAL_SUMMARY: "Overview",
						EXPERIENCE: "Experience",
						PORTFOLIO: "Portfolio",
						CONTACT: "Contact"
					},
					LANGUAGE_SELECTOR:{
						TOGGLE: "Language",
						TITLE: "Select Language"
					}
				},

				TIMELINE:{
					HINT: {
						TITLE: "NAVIGATE TIMELINE",
						INSTRUCTION: "Swipe<br>Mouse Wheel<br>Drag"
					}
				},

				TECHNICAL_SUMMARY: {
					HEADER: {
						TITLE: "Overview",
						DESCRIPTION: "<img src='asset/image/misc/portrait.jpg' class='portrait'/><p>Hello, my name is Layton. I am a web application architect.</p><p>I build scalable, beautiful applications and websites that work on any device, OS, and browser that my clients want.</p><p>Below is a simple rating of some of my skills. Take note: I choose these ratings based off my observations comparing myself to my peers, and the general community. A five here indicates that I have enough knowledge about a topic that I would be comfortable teaching it.</p><p>Click them to read more about them.</p>"
					},
					KEY: {
						title: "Key",
						items: [
							"5 - Highly Proficient",
							"4 - Proficient",
							"3 - Solid Experience",
							"2 - Some Experience",
							"1 - Little-to-no Experience"
						]
					},
					SUMMARY_GROUPS: {
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
								NODEJS: {
									NAME: "NodeJS",
									TOOLTIP: "As a Javascript developer, NodeJS came easily to me. I am actively experimenting with it and learning more about it, and am happy with the number of useful frameworks that have popped up to accelerate that process, such as Express and Meteor (my new favorite)."
								},
								PHP: {
									NAME: "PHP",
									TOOLTIP: "As a full-stack developer I have led the tech effort for multiple successful startups. I have used PHP as a back-end solution on many successful projects."
								},
								JAVA: {
									NAME: "Java",
									TOOLTIP: "I have used Java to write both Android and web applications. While I don't consider myself highly tested in Java, I do have a desire to learn Java, should I be given the opportunity."
								},
								C_SHARP: {
									NAME: "C#",
									TOOLTIP: "I have worked in C# various times on both middle-tier and front-end applications."
								}
							}
						},
						TECHNOLOGIES: {
							TITLE: "Technologies",
							ITEMS: {
								ANGULAR2: {
									NAME: "Angular 2",
									TOOLTIP: "Angular 2 is a beautiful platform that improved over its predecessor in almost every way. I particularly like how much it cozies up to the industry standard ES6 spec. Lately I have spent a significant portion of my time architecting and building web applications in Angular 2."
								},
								HANDLEBARS: {
									NAME: "Handlebars",
									TOOLTIP: "Handlebars has helped me deliver both statically generated as well as Javascript driven solutions for major clients such as Intel and Microsoft. In fact, at the time of this writing, all global components for the Intel.com global initiative were generated out of a library that I architected!"
								},
								GREENSOCK: {
									NAME: "Greensock API",
									TOOLTIP: "Why, this very site uses some Greensock to handle animation! It is one of my favorite APIs and I am extremely comfortable using it."
								},
								AWS: {
									NAME: "AWS",
									TOOLTIP: "AWS is a powerful platform that can make deployment and content management simple and fast. I have leveraged AWS's S3 cloud storage and RDS instances to manage large distributed projects."
								},
								JQUERY: {
									NAME: "jQuery",
									TOOLTIP: "No explanation required. jQuery: the screwdriver of the Javascript world!"
								},
								DATABASES: {
									NAME: "Databases",
									TOOLTIP: "I have constructed and performed DBA work on various MySQL relational databases, and I am familiar with MongoDB and use it actively in current projects."
								},
								WINJS: {
									NAME: "WinJS",
									TOOLTIP: "When Microsoft launched Windows 8, they launched a whole new platform for authoring apps as well. I worked on multiple Windows applications that were delivered to over 60 countries worldwide, interacting with millions of people."
								}
							}
						},
						PROCESS: {
							TITLE: "Process",
							ITEMS: {
								LOCALIZATION: {
									NAME: "Localization",
									TOOLTIP: "Nearly every single web application I have written in the last several years has been localized to anywhere between 30 and 130 countries. I know how to think, design, and build for localization."
								},
								VCS: {
									NAME: "Version Control",
									TOOLTIP: "Git, SVN, TFS. I'm well versed in various flavors of version control, and it forms the backbone of my work. I utilize advanced work flows such as commit hooks to send data to third parties such as Slack or Jira to reduce development effort automatically."
								},
								AGILE: {
									NAME: "Agile",
									TOOLTIP: "I am comfortable working in sprints and using scrum best practices to enhance the development process. I have led or been on Agile/scrum teams for major projects like the Intel global rebrand, Microsoft Band Online Dashboard and Xbox.com's launch of the Xbox One properties."
								},
								SCRUM: {
									NAME: "Scrum",
									TOOLTIP: "Experience with Jira, YouTrack, and Bugzilla. I regularly lead scrum triages with my teams and am fluent in managing backlogs, sprints, etc. It is my aim to become a CSM in the near future."
								}
							}
						},
						TOOLING: {
							TITLE: "Tooling",
							ITEMS: {
								WEBPACK: {
									NAME: "Webpack",
									TOOLTIP: "Webpack is a robust build system that can be extremely powerful when properly configured."
								},
								GRUNT: {
									NAME: "Build Tools",
									TOOLTIP: "Front-end build tools have become a de-facto standard for development. I have embraced them fully and have even provided the national Razorfish team with a new standard recommendation on Grunt usage process."
								},
								CSS_PREPROCESSORS: {
									NAME: "CSS Pre-processors",
									TOOLTIP: "SASS and LESS are now considered a standard, and I am fluent with both. Beyond that, I have what I like to consider a sophisticated opinion about what makes good CSS pre-processing architecture."
								},
								CUSTOM_TOOLING: {
									NAME: "Custom/Open Source",
									TOOLTIP: "Absent a tool that I need, I've been known to write one, or to contribute to open source projects to enhance an existing tool that would benefit from an upgrade."
								}
							}
						},
						SOFT_SKILLS: {
							TITLE: "Soft Skills",
							ITEMS: {
								CROSS_DISCIPLINE: {
									NAME: "Cross Disciplined",
									TOOLTIP: "Bridging the gap between creative, UX, BA, BD, DM, dev, QA, and dev-ops takes more than a little knowledge of each silo. My experience across agencies, startups, and sole-proprietorships has given me that knowledge, and it benefits me every day."
								},
								CLIENT_MANAGEMENT: {
									NAME: "Client Management",
									TOOLTIP: "A good developer is one thing. A developer who can talk to non-technical parties is another."
								},
								TEAM_MANAGEMENT: {
									NAME: "Team Management",
									TOOLTIP: "Leading a team requires loyalty from those around you. I believe that loyalty can only be garnered through respect. I respect my co-workers, no matter where they sit in the organization."
								},
								PROJECT_SCOPING: {
									NAME: "Project Scoping",
									TOOLTIP: "Knowing how long a project can take before it starts takes big-picture thinking based on real-world experience. I have said experience."
								}
							}
						},
						SPOKEN_LANGUAGES: {
							TITLE: "Spoken Languages",
							ITEMS: {
								ENGLISH: {
									NAME: "English",
									TOOLTIP: "I was born in Pennsylvania. I've lived in New York, Washington, and Colorado. I've been to more states than I can count and driven across the entirety of the country five times. I like to think my English is at least 'okay'."
								},
								SPANISH: {
									NAME: "Spanish",
									TOOLTIP: "Did you notice you can switch this site into Spanish via the language selector? My degree is a B.A. of Spanish Language and Literature from Western Washington University. I have lived approximately two years of my life in Argentina. My girlfriend is from Argentina. I'm completely fluent in Spanish."
								},
								PORTUGUESE: {
									NAME: "Portuguese",
									TOOLTIP: "When I lived in Argentina, I went to visit Brasil. In preparation I studied through the highest level of Portuguese available at my university in Rosario, Argentina."
								}
							}
						},
						INTERESTS: {
							TITLE: "Interests",
							ITEMS: {
								SCUBA: {
									NAME: "Scuba",
									TOOLTIP: "I am a certified PADI scuba Dive Master. I occasionally work weekends (once a month or so) training divers of all skill levels. I also really enjoy diving recreationally. I have dived to a depth of 125 feet, swam with bull sharks, and hung out with octopuses. Because of all of this experience, I am a vocal conservationist."
								},
								ART: {
									NAME: "Art",
									TOOLTIP: "I studied fine art and design at Western Washington University, and have always been artistic. I enjoy painting with watercolor or digitally with a tablet, and drawing with graphite or charcoal."
								},
								MUSIC: {
									NAME: "Music",
									TOOLTIP: "I studied percussion at Western Washington University. I have played piano nearly my entire life both solo and in groups. I've also played drums and percussion in jazz ensembles, orchestras, bands, and other groups."
								},
								CARPENTRY: {
									NAME: "Carpentry",
									TOOLTIP: "My father is a master carpenter, and as a kid I was able to work and learn with him. I now enjoy building all of my own furniture with my girlfriend, from scratch."
								},
								BEER: {
									NAME: "Brewing",
									TOOLTIP: "I deeply enjoy making things, and food and beverages are a part of that. I brew my own beer, and organize a brewing group called Manly Bräu. It's cooler than it sounds."
								},
								ATHLETICS: {
									NAME: "Athletics",
									TOOLTIP: "I am athletic, and I enjoy running, playing soccer, going to the gym, and frequenting my local Krav Maga training gym where I constantly get my @$$ kicked by my instructor, Adam. I enjoy events like 5ks, half marathons, and Tough Mudder-style events."
								}
							}
						}
					}
				},

				EXPERIENCE: {
					EVENTS: {
						DESIGN_MILL: {
							LABEL: "Design Mill",
							SUBLABEL: "Founder - CEO"
						},
						YACHTVID: {
							LABEL: "Yacht Vid",
							SUBLABEL: "CTO"
						},
						MUTUAL_AUTO_MEDIA: {
							LABEL: "Mutual Auto Media",
							SUBLABEL: "CTO"
						},
						GLOBANT: {
							LABEL: "Globant",
							SUBLABEL: "Senior Front-End Developer"
						},
						RAZORFISH: {
							LABEL: "Razorfish",
							SUBLABEL: "Presentation Layer Architect"
						},
						GLYMPSE: {
							LABEL: "Glympse",
							SUBLABEL: "Front-end SDE"
						},
						MEDCHAT: {
							LABEL: "MedChat",
							SUBLABEL: "Senior Front-end SDE"
						}
					}
				},

				PORTFOLIO: {
					EVENTS: {
						INTEL_ANTHEM: {
							LABEL: "Intel Anthem",
							SUBLABEL: "Presentation Layer Architect"
						},
						INTEL: {
							LABEL: "Intel.com",
							SUBLABEL: "Presentation Layer Architect"
						},
						RYSE: {
							LABEL: "Xbox One - Ryse",
							SUBLABEL: "Development Lead"
						},
						BAND: {
							LABEL: "Microsoft Band",
							SUBLABEL: "Presentation Layer Architect"
						},
						XBOX: {
							LABEL: "Xbox.com",
							SUBLABEL: "Development Team Lead"
						}
					}
				},

				CONTACT: {
					TITLE: "Get in touch",
					BODY: [
						"It's easy to get ahold of me, and I'm quick to respond. Please reach out with any ideas or opportunities that you think I may be interested in.",
						"<a href='mailto:me@laytonmiller.com'>me@laytonmiller.com</a>"
					]
				}
			});
		}
	}
);
