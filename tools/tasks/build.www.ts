import {PATH/*, APP_SRC*/} from '../config';

export = function buildLibDev(gulp) {
  return function () {
    return gulp.src(PATH.src.web +'/*')
      .pipe(gulp.dest(PATH.dest.dev.web));
  };
};
