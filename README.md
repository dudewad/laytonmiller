# laytonmiller.com
Layton Miller's personal website

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


#Bootstrap
This project employs a custom bootstrap-sass distribution that was pulled in from Bower, customized, and then moved into
the style/vendor directory for compilation. It is stripped **way** down to remove unused CSS rules.



#SCSS
The SASS files are divided into 4 categories:

- generated
- include
- partial
- vendor

##generated
The "generated" files are files that are pre-compiled and included into the SASS build. Things like grunt-spritesmith
generate these files to be included and are part of the larger build process. These files need to be run *before* the 
SASS task or they will not be updated.

##include
The "include" files are the global-level SASS stuff; font imports, variables, mixins, etc - everything that other 
normal SASS items will be using.

##partial
This directory needs no introduction. Partials build up the core of the SASS style base.

##vendor
Vendor-generated "stuff" goes here. Bootstrap, for example, has a SASS distribution. Our version has been modified 
heavily to pare it down and make it lighter weight.



#Language Switching
Language switching has been enabled for the entire application by serving strings constant files and including one set
based off the user's current language setting in a cookie. If no cookie is set, the language will default to en_us.
Note that all languages should support the exact same set of properties since the entire site localizes every item page
wide. All components (html and javascript) should be string-free (no hard-coding) and any strings should be stored in
the langage-specific strings constants files.