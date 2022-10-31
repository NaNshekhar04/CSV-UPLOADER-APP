// SETTING UP CONNECT-FLASH AND WILL BE USED AS MIDDLEWARE

module.exports.setFlash = function (req, res, next) {
    res.locals.flash = {
      success: req.flash('success'),
      error: req.flash('error'),
    };
    next();
  };