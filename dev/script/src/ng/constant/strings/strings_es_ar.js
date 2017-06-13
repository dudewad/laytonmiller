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
						SUBTITLE: "Architecto web, Líder de equipos"
					},
					NAVIGATION: {
						TECHNICAL_SUMMARY: "Resumen",
						EXPERIENCE: "Experiencia",
						PORTFOLIO: "Portfólio",
						CONTACT: "Contacto"
					},
					LANGUAGE_SELECTOR: {
						TOGGLE: "Idioma",
						TITLE: "Eligir Idioma"
					}
				},

				TIMELINE: {
					HINT: {
						TITLE: "NAVEGAR",
						INSTRUCTION: "Desplazarse<br>Rueda (mouse)<br>Arrastrar"
					}
				},

				TECHNICAL_SUMMARY: {
					HEADER: {
						TITLE: "Resumen",
						DESCRIPTION: "<img src='asset/image/misc/portrait.jpg' class='portrait'/><p>Hola, me llamo Layton. Soy arquitecto de aplicaciones web.</p><p>Desarrollo aplicaciones y páginas web expandibles y bellas que funcionan en cualquier aparato, sistema operativo y browser que quieran mis clientes.</p><p>Abajo hay una lista simple de mis habilidades. Eligo estes números basado en mis observaciones comparandome a mis compañeros, y a la comunidad en general. Un cinco acá significa que yo estaría cómodo dando algúna clase sobre tal tema.</p><p>Haz clic en ellos para leer más.</p>"
					},
					KEY: {
						title: "Clave",
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
							TITLE: "Lenguajes",
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
									TOOLTIP: "La arquitectura de CSS es tan importante como la de HTML, porque tiene efectos en eficiencia, mantenebilidad, y funcionalidad en los browsers viejos. He pasado toda mi carrera desarrollando un alto conocimiento de CSS y creo soluciones que son elegantes y compatibles entre los varios browsers y aparatos."
								},
								NODEJS: {
									NAME: "NodeJS",
									TOOLTIP: "Como engeniero de Javascript, NodeJS me vino fácil. Voy experimentando y aprendiendo activamente, y estoy muy contento con la cantidad de frameworks útiles que hay para acelerar ese proceso, como Express y Meteor (mi nuevo favorito)."
								},
								PHP: {
									NAME: "PHP",
									TOOLTIP: "Como engeniero 'full-stack', he dirigido las esfuerzas de los equipos de tecnología en varios startups y empresas. PHP fue la solución eligida en varios proyectos exitosos."
								},
								JAVA: {
									NAME: "Java",
									TOOLTIP: "Usé Java para hacer varios aplicaciónes de web y de Android. Aunque no me considero ningún experto con Java, tengo muchas ganas de aprender más, si se me presenta la oportunidad."
								},
								C_SHARP: {
									NAME: "C#",
									TOOLTIP: "Trabajé con C# en una multitud de aplicaciónes, para middle-tier y también front-end."
								}
							}
						},
						TECHNOLOGIES: {
							TITLE: "Technologías",
							ITEMS: {
								ANGULAR2: {
									NAME: "Angular 2",
									TOOLTIP: "Angular 2 es un framework hermosa que mejoró muchisimo con la segunda versión. Me gusta mucho como su arquitectura se asemeja a lo de ES6. Ultimamente he pasado una porción siginificante de mi tiempo construyendo applicaciónes web con Angular 2."
								},
								HANDLEBARS: {
									NAME: "Handlebars",
									TOOLTIP: "Handlebars me ayudó a armar páginas estaticas y dinámicas para grandes clients como Intel y Microsoft. De hecho, al momento de escribir estas palabras, todas los componentes de Intel.com son generados por una librería de la cual yo soy arquitecto!"
								},
								GREENSOCK: {
									NAME: "Greensock API",
									TOOLTIP: "Esta página misma tiene Greensock incorporado para hacer ciertas animaciónes! Es uno de mis APIs preferido y estoy muy como usandolo."
								},
								JQUERY: {
									NAME: "jQuery",
									TOOLTIP: "Claro."
								},
								AWS: {
									NAME: "AWS",
									TOOLTIP: "AWS es una plataforma muy poderosa que puede hacer muy sencillo los deployments y manteniemiento de contenido. He usado los servicios S3 y RDS de AWS para mantener proyectos grandes y distribuidas."
								},
								DATABASES: {
									NAME: "Bases de Datos",
									TOOLTIP: "Construí y trabaje como DBA en una variedad de bases de datos de MySQL, y tengo conocimiento de MongoDB, lo cual uso en proyectos actuales."
								},
								WINJS: {
									NAME: "WinJS",
									TOOLTIP: "Con el lanzamiento de Windows 8, Microsoft también lanzó una plataforma nueva para crear aplicaciónes. Yo trabaje en varias aplicaciónes de Windows para Microsoft que se producieron en mas de 60 paises atravez del mundo, interactuando con millones de personas."
								}
							}
						},
						PROCESS: {
							TITLE: "Proceso",
							ITEMS: {
								LOCALIZATION: {
									NAME: "Localización",
									TOOLTIP: "Casi cada aplicación que escribo en los últimos años fue localizado a entre 30 y 130 paises. Se pensar, diseñar, y construir para la localización."
								},
								VCS: {
									NAME: "Version Control",
									TOOLTIP: "Git, SVN, TFS. Soy experimentado en varios tipos de version control, y forma una parte muy importante de mi trabajo. Utilizo técnicas avanzadas como commit hooks para enviar datos a otras aplicaciónes como Slack o Jira para reducir la esfuerza de desarollo automaticamente."
								},
								AGILE: {
									NAME: "Agile",
									TOOLTIP: "Estoy muy cómodo trabajadon en sprints y usando los sistemas de scrum para mejorar el proceso de desarrollo. He sido lider o part de equipos de Agile/scrum en grandes proyectos como el rebrand global de Intel, el Dashboard de Web del Microsoft Band, y el lanzamiento de los propiedades de Xbox One para Xbox.com."
								},
								SCRUM: {
									NAME: "Scrum",
									TOOLTIP: "Tengo experiencia con Jira, YouTrack y Bugzilla. Parte de mi día-a-día es manejar o participar en los scrum triages con mis equipos y tengo fluidez en trabajar con backlogs, sprints, etc. Me gustaría certificarme como CSM en el futuro."
								}
							}
						},
						TOOLING: {
							TITLE: "Herramientas",
							ITEMS: {
								WEBPACK: {
									NAME: "Webpack",
									TOOLTIP: "Webpack es un build system que puede ser extremadamente poderoso cuando está bien configurado."
								},
								GRUNT: {
									NAME: "Build Tools",
									TOOLTIP: "Los 'front-end build tools' llegaron a ser un estandard en la industria. Tomo ventaja de ellos todos los días, hasta dar una recomendación al equipo nacional de Razorfish en el proceso de usar al Grunt."
								},
								CSS_PREPROCESSORS: {
									NAME: "Pre-procesadores de CSS",
									TOOLTIP: "SASS y LESS ya son estandardes, y me hice experto con las dos. Ademas de eso, tengo lo que a mi me gusta considerar una opinion avanzado de que es la buena arquitectura de los lenguajes de los pre-procesadores de CSS."
								},
								CUSTOM_TOOLING: {
									NAME: "Custom/Open Source",
									TOOLTIP: "Si me falta alguna herramienta, tengo la habilidad de armar una, o contribuir a algún proyecto open source para mejorar una herramienta que se beneficiaría de una aumentación."
								}
							}
						},
						SOFT_SKILLS: {
							TITLE: "Otras aptitudes",
							ITEMS: {
								CROSS_DISCIPLINE: {
									NAME: "Cross Disciplined",
									TOOLTIP: "Conectar los grupos de diseño, UX, BD, DM, desarrollo, QA, y dev-ops requiere mas que un poquito de experiencia con cada categoría. Mi experiencia entre las agencias, startups, y empresas me dió mucho conocimiento que me ayuda todos los días."
								},
								CLIENT_MANAGEMENT: {
									NAME: "Client Management",
									TOOLTIP: "Un buen engeniero es una cosa. Un engeniero que sabe hablar con gente que no conoce lo técnico es otra."
								},
								TEAM_MANAGEMENT: {
									NAME: "Team Management",
									TOOLTIP: "Hacerse el lider de un equipo requiere lealtad de los que te rodean. Yo creo que lealtad solamente se genera atravez del respeto. Yo respeto a mis compañeros de trabajo, no importa la posición que tiene en la organización."
								},
								PROJECT_SCOPING: {
									NAME: "Project Scoping",
									TOOLTIP: "Saber cuanto tiempo va a durar un proyecto antes que empieza requiere pensamiento en las detalles grandes basado en experiencia del mundo real. Tengo dicho experiencia."
								}
							}
						},
						SPOKEN_LANGUAGES: {
							TITLE: "Idiomas",
							ITEMS: {
								ENGLISH: {
									NAME: "Inglés",
									TOOLTIP: "Yo nací en Pennsylvania, EE.UU. y vivi mi vida en varios estados como Nueva York, Washington, y Colorado. Hablo lo suficiente de inglés para manejarme en el trabajo y pedir comida. ;)"
								},
								SPANISH: {
									NAME: "Español",
									TOOLTIP: "Mi título es un B.A. de lenguage y literatura española de Western Washington University. Viví dos años de mi vida en Argentina, y viajé por muchos países hispanohablantes. Mi novia es Argentina, y me sigue corrigiendo todos los días."
								},
								PORTUGUESE: {
									NAME: "Portugués",
									TOOLTIP: "Cuando vivía en Argentina, fui a visitar a Brasil. Estudie hasta el nivel mas alto que ofrecía la universidad en Rosario, Argentina."
								}
							}
						},
						INTERESTS: {
							TITLE: "Intereses",
							ITEMS: {
								SCUBA: {
									NAME: "Buceo",
									TOOLTIP: "Soy un Divemaster certificado por la organización internacional PADI. Trabajo cada tanto en los fines de semana dando clases de buceo con la escuela Seattle Scuba. He buceado a una profundidad de 40 metros, buceado con tiburónes toro, y nadado con pulpos. Por lo tanto, soy conservacionista del medioambiente."
								},
								ART: {
									NAME: "Arte",
									TOOLTIP: "Estudié arte y diseño en Western Washington University, y siempre me consideraba artístico. Me gusta pintar con acuarelas o digitalmente con un tablet, y dibujar con lápiz o carbón."
								},
								MUSIC: {
									NAME: "Música",
									TOOLTIP: "Estudié percusión en Western Washington University. Toco piano casi toda mi vida solo y con grupos. También toqué la batería y percusión en grupos de jazz, orquestras, bandas de rock, y otros grupos."
								},
								CARPENTRY: {
									NAME: "Carpintería",
									TOOLTIP: "Mi padre es un carpintero maestro, y cuando era niño tuve la oportunidad de trabajar y aprender con él. Ahora me gusta construir todos mis propios muebles con mi novia."
								},
								BEER: {
									NAME: "Hacer Cerveza",
									TOOLTIP: "Como me gusta hacer cosas, naturalmente me da mucho gusto crear la comida y las bebidas también. Hago mi propia cerveza, y organizo un grupo de hombres feroces que se llama 'Manly Bräu'."
								},
								ATHLETICS: {
									NAME: "Atletismo",
									TOOLTIP: "Me gusta correr, jugar futbol, ir al gimnasio, y ir al gimnasio de Krav Maga donde siempre me caga a patadas mi instructor, Adam. Me gustan los eventos como los 5k, media maraton, y eventos estilo Tough Mudder."
								}
							}
						}
					}
				},

				EXPERIENCE: {
					EVENTS: {
						DESIGN_MILL: {
							LABEL: "Design Mill",
							SUBLABEL: "Fundador - CEO"
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
							SUBLABEL: "Engeniero Front-end, Senior"
						},
						RAZORFISH: {
							LABEL: "Razorfish",
							SUBLABEL: "Arquitecto Web"
						},
						GLYMPSE: {
							LABEL: "Razorfish",
							SUBLABEL: "Engeniero: Front-end"
						}
					}
				},

				PORTFOLIO: {
					EVENTS: {
						INTEL_ANTHEM: {
							LABEL: "Intel Anthem",
							SUBLABEL: "Arquitecto Web"
						},
						INTEL: {
							LABEL: "Intel.com",
							SUBLABEL: "Arquitecto Web"
						},
						RYSE: {
							LABEL: "Xbox One - Ryse",
							SUBLABEL: "Lead de Desarrollo"
						},
						BAND: {
							LABEL: "Microsoft Band",
							SUBLABEL: "Arquitecto Web"
						},
						XBOX: {
							LABEL: "Xbox.com",
							SUBLABEL: "Lead de Desarrollo"
						}
					}
				},

				CONTACT: {
					TITLE: "Contactamosnos",
					BODY: [
						"Es facil conectarse conmigo, y respondo lo más rápido posible. Por favor, pongase en contacto conmigo con cualquiera oportunidad o propuesta en la que yo pudiera ser de ayuda.",
						"<a href='mailto:me@laytonmiller.com'>me@laytonmiller.com</a>"
					]
				}
			});
		}
	}
);