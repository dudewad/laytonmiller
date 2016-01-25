var LMApp_conditionalLoadList = LMApp_conditionalLoadList || [];

LMApp_conditionalLoadList.push({
		"type": "constant",
		"condition": "cookie",
		"cookie": "lang",
		"value": "es_ar",
		fn: function () {
			LMApp.constant("STRINGS", {
				CORE: {
					LANGUAGE: "es_ar",
					HEADER: {
						TITLE: "LAYTON MILLER",
						SUBTITLE: "Architecto web, Líder de equipos de desarrollo"
					},
					NAVIGATION: {
						TECHNICAL_SUMMARY: "Resumen",
						EXPERIENCE: "Experiencia",
						PORTFOLIO: "Portfólio",
						CONTACT: "Contacto"
					}
				},

				TECHNICAL_SUMMARY: {
					HEADER: {
						TITLE: "Resumen",
						DESCRIPTION: "<img src='asset/image/misc/portrait.jpg' class='portrait'/><p>Hola, me llamo Layton. Soy arquitecto de aplicaciones web.</p><p>Desarrollo aplicaciones y páginas web expandibles y bellas que funcionan en cualquier aparato, sistema operativo y browser que quieran mis clientes.</p><p>Abajo hay una lista simple de mis habilidades. Eligo estes números basado en mis observaciones comparandome a mis compañeros, y a la comunidad en general. Un cinco acá significa que yo estaría cómodo dando algúna clase sobre tal tema.</p><p>Haz clic en ellos para leer más.</p>"
					},
					KEY: {
						title: "Key",
						items: [
							"5 - Nivel experto",
							"4 - Nivel avanzado",
							"3 - Experiencia",
							"2 - Alguna experiencia",
							"1 - Poca experiencia"
						]
					},
					SUMMARY_GROUPS: {
						LANGUAGES: {
							TITLE: "Languages",
							ITEMS: {
								JAVASCRIPT: {
									NAME: "Javascript",
									TOOLTIP: "Javascript es mi herramienta preferida. Tengo mucha experiencia armando aplicaciones avanzados con Javascript nativo, y con frameworks como AngularJS."
								},
								HTML: {
									NAME: "HTML",
									TOOLTIP: "Aunque escribir HTML es un concepto bastante básico para la mayoria de desarrolladores, escribir código limpio que sirve para SEO y simultaneamente mejora el proceso de desarollo entre apartos distinto no lo es. Como arquitecto, estoy orgulloso de mi habilidad de ver los problemas potenciales de un diseño antes de armarlo."
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
								HANDLEBARS: {
									NAME: "Handlebars",
									TOOLTIP: "Handlebars has helped me deliver both statically generated as well as Javascript driven solutions for major clients such as Intel and Microsoft. In fact, at the time of this writing, all global components for the Intel.com global initiative were generated out of a library that I architected!"
								},
								GREENSOCK: {
									NAME: "Greensock API",
									TOOLTIP: "Why, this very site uses some Greensock to handle animation! It is one of my favorite APIs and I am extremely comfortable using it."
								},
								JQUERY: {
									NAME: "jQuery",
									TOOLTIP: "No explanation required. The word 'ninja' comes to mind, but that would be too cliché to utter here. Perhaps a 'no duh' will suffice."
								},
								ANGULARJS: {
									NAME: "AngularJS",
									TOOLTIP: "Production projects using AngularJS are both extensible and maintainable. The Microsoft Band online dashboard is a good example of a project where I took a lead architectural role in both its design and development."
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
									TOOLTIP: "Experience with Jira, YouTrack, and Bugzilla. I regularly lead scrum triages with my teams and am fluent in managing backlogs, sprints, etc. I understand how to manage incoming work that is not part of a sprint and the effect it has on the current workload. It is my aim to become a CSM in the near future."
								}
							}
						},
						TOOLING: {
							TITLE: "Tooling",
							ITEMS: {
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
									TOOLTIP: "Bridging the gap between creative, UX, BD, DM, dev, QA, and dev-ops takes more than a little knowledge of each silo. My experience across agencies, startups, and sole-proprietorships has given me that knowledge, and it benefits me every day."
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
									TOOLTIP: "Knowing how long a project can take before it starts takes big-picture thinking based on real-world experience. Realistic scoping is a skill one can only learn by trial and error. I have done my fair share."
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
				}
			});
		}
	}
);