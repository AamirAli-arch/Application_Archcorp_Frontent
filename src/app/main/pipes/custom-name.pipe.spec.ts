import { CustomNamePipe } from "./custom-name-pipe.pipe";
describe('CustomNamePipe', () => {
    it('create an instance', () => {
      const pipe = new CustomNamePipe();
      expect(pipe).toBeTruthy();
    });
  });
  