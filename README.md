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
with [testem](https://github.com/airportyh/testem) to perform integration testing on the **Ordr** application.

# Maturity

We just built this last night (March 5, 2013), but we got docs and a running test!  We're going to be testing
numerous different testing metaphors and will be documenting them as we go along.  Please offer suggestions/
feedback/etc and/or come join us!

# Installation

1.  Clone this application into your favorite work directory:

    ```git clone git@github.com:OC-Emberjs/peepcode-ordr-test.git```

1.  Install [testem](https://github.com/airportyh/testem).
1.  In this project's directory, open a terminal window and enter the command ```testem```.
1.  Observe that ```testem``` is running.
1.  Connect browsers to ```testem``` as documented by ```testem```.
1.  Observe test results.

At this point, we have a single proof-of-concept test here:

    js/tests/tests/verify_tables_spec.js

# Credits

Thanks to [Peepcode](http://peepcode.com) for giving permission to use their **Ordr** application.  Highly recommend
their [screencast](https://peepcode.com/products/emberjs).
