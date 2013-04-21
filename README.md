peepcode-ordr-test
==================

Testing experiments on the Peepcode Ordr EmberJS Application

**See: [Peepcode EmberJS Screencast](https://peepcode.com/products/emberjs).**

# Objectives

The **Ordr** application in the [Peepcode screencast](https://peepcode.com/products/emberjs)
is a perfect application to experiment upon:

1.  Small
    * 85 lines of Javascript
    * <100 lines of HTML/templating
2.  Sophisticated
    * 5 classes
    * Key relationships
    * Exploits EmberJS features (which it should since it's an EmberJS tutorial!)

Hence, it's a reasonable "smallest realistic" Ember app to "play with".  So here we're playing
with [JS Karma](https://github.com/karma-runner/karma) as the test runner to run integration tests on the **Ordr** application.

# Maturity

We're going to be testing numerous different testing metaphors and will be documenting them as we go along.  Please offer suggestions/
feedback/etc and/or come join us!

# Installation

1.  Clone this application into your favorite work directory:

        git clone git@github.com:OC-Emberjs/peepcode-ordr-test.git

2.  Install [JS Karma](https://github.com/karma-runner/karma).
    
    Karma config expects Firefox and Chrome installed.

3.  In a console window:

        cd peepcode-ordr-test
        karma start


At this point, we have test scripts here:

    tests/integration/*

And the App sits at:

    app/*




# Credits

Thanks to:

* [Peepcode](http://peepcode.com) for giving permission to use their **Ordr** application.  Highly recommend
their [screencast](https://peepcode.com/products/emberjs).
* Bill Heaton for his PRs.
