import {expect, test} from '@oclif/test'
const cfonts = require('cfonts');

const output = cfonts.render('nous', {
    colors: ['white'],
    gradient: ["#DAE2F8", "#D6A4A4"],
    space: false
});

const subtitle = cfonts.render('Un orchestre parmi nous', {
    font: 'tiny',
    colors: ['#B06AB3'],
    gradient: ["#636FA4", "#E8CBC0"],
    independentGradient: true
});
describe('creer', () => {
  test
  .stdout()
  .command(['creer', '--name=testing'])
  .it('runs creer --name=testing', ctx => {
    expect( output.lines ).to.eq(1);
    expect(subtitle.lines).to.eq(1);
  })
})
