import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { pkgroll } from '../../utils.js';
import { packageFixture } from '../../fixtures.js';

export default testSuite(({ describe }, nodePath: string) => {
	describe('output: commonjs', ({ test }) => {
		test('{ type: commonjs, field: main, srcExt: js, distExt: js }', async () => {
			await using fixture = await createFixture({
				...packageFixture,
				'package.json': JSON.stringify({
					main: './dist/index.js',
				}),
			});

			const pkgrollProcess = await pkgroll([], {
				cwd: fixture.path,
				nodePath,
			});

			expect(pkgrollProcess.exitCode).toBe(0);
			expect(pkgrollProcess.stderr).toBe('');

			const content = await fixture.readFile('dist/index.js', 'utf8');
			expect(content).toMatch('module.exports =');
		});

		test('{ type: commonjs, field: main, srcExt: mts, distExt: js }', async () => {
			await using fixture = await createFixture({
				...packageFixture,
				'package.json': JSON.stringify({
					main: './dist/mts.js',
				}),
			});

			const pkgrollProcess = await pkgroll([], {
				cwd: fixture.path,
				nodePath,
			});

			expect(pkgrollProcess.exitCode).toBe(0);
			expect(pkgrollProcess.stderr).toBe('');

			const content = await fixture.readFile('dist/mts.js', 'utf8');
			expect(content).toMatch('exports.sayHello =');
		});

		test('{ type: commonjs, field: main, srcExt: cts, distExt: js }', async () => {
			await using fixture = await createFixture({
				...packageFixture,
				'package.json': JSON.stringify({
					main: './dist/cts.js',
				}),
			});

			const pkgrollProcess = await pkgroll([], {
				cwd: fixture.path,
				nodePath,
			});

			expect(pkgrollProcess.exitCode).toBe(0);
			expect(pkgrollProcess.stderr).toBe('');

			const content = await fixture.readFile('dist/cts.js', 'utf8');
			expect(content).toMatch('exports.sayHello =');
		});

		test('{ type: commonjs, field: main, srcExt: cts, distExt: cjs }', async () => {
			await using fixture = await createFixture({
				...packageFixture,
				'package.json': JSON.stringify({
					main: './dist/cts.cjs',
				}),
			});

			const pkgrollProcess = await pkgroll([], {
				cwd: fixture.path,
				nodePath,
			});

			expect(pkgrollProcess.exitCode).toBe(0);
			expect(pkgrollProcess.stderr).toBe('');

			const content = await fixture.readFile('dist/cts.cjs', 'utf8');
			expect(content).toMatch('exports.sayHello =');
		});

		test('{ type: module, field: main, srcExt: js, distExt: cjs }', async () => {
			await using fixture = await createFixture({
				...packageFixture,
				'package.json': JSON.stringify({
					type: 'module',
					main: './dist/index.cjs',
				}),
			});

			const pkgrollProcess = await pkgroll([], {
				cwd: fixture.path,
				nodePath,
			});

			expect(pkgrollProcess.exitCode).toBe(0);
			expect(pkgrollProcess.stderr).toBe('');

			const content = await fixture.readFile('dist/index.cjs', 'utf8');
			expect(content).toMatch('module.exports =');
		});

		test('{ type: commonjs, field: main, srcExt: mjs, distExt: cjs }', async () => {
			await using fixture = await createFixture({
				...packageFixture,
				'package.json': JSON.stringify({
					main: './dist/mjs.cjs',
				}),
			});

			const pkgrollProcess = await pkgroll([], {
				cwd: fixture.path,
				nodePath,
			});

			expect(pkgrollProcess.exitCode).toBe(0);
			expect(pkgrollProcess.stderr).toBe('');

			const content = await fixture.readFile('dist/mjs.cjs', 'utf8');
			expect(content).toMatch('exports.sayHello =');
		});

		test('nested directory', async () => {
			await using fixture = await createFixture({
				...packageFixture,
				'package.json': JSON.stringify({
					main: './dist/nested/index.js',
				}),
			});

			const pkgrollProcess = await pkgroll([], {
				cwd: fixture.path,
				nodePath,
			});

			expect(pkgrollProcess.exitCode).toBe(0);
			expect(pkgrollProcess.stderr).toBe('');

			const content = await fixture.readFile('dist/nested/index.js', 'utf8');
			expect(content).toMatch('nested entry point');
		});
	});
});
