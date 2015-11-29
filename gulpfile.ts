import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {ENV, PATH} from './tools/config';
import {
  autoRegisterTasks,
  registerInjectableAssetsRef,
  task
} from './tools/utils';



// --------------
// Configuration.
autoRegisterTasks();

// --------------
// Clean (override).
gulp.task('clean',       task('clean', 'all'));
gulp.task('clean.dist',  task('clean', 'dist'));
gulp.task('clean.test',  task('clean', 'test'));

// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean.dist',
              'tslint',
             // 'build.jslib.dev',
              'build.js.dev',
              'build.www',
              done));

// --------------
// Docs

gulp.task('docs', done =>
  runSequence(
        'build.docs',
        'serve.docs',
        done
  ));







