/* eslint-disable max-classes-per-file */
import type { IBlockProps } from "../../types/services/block/Block";
import { Block } from ".";

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

class TestBlock extends Block {
  constructor(props?: IBlockProps) {
    super({ ...props });
  }

  render(): string | void {
    return `<div class="test">{{testText}}</div>`;
  }
}

class ChildBlock extends TestBlock {
  render() {
    return `<div class="child">Child content</div>`;
  }
}

class ParentBlock extends TestBlock {
  render() {
    return `<div class="parent">{{{child}}}</div>`;
  }
}

describe("Block tests", () => {
  let instance: TestBlock;
  beforeEach(() => {
    instance = new TestBlock({ testText: "Test" });
  });

  it("should create a block element which is instance of Block", () => {
    expect(instance).toBeInstanceOf(Block);
  });

  it("should create a block element which content is instance of HTMLElement", () => {
    expect(instance.getContent()).toBeInstanceOf(HTMLElement);
  });

  it("should have Test text as text content of created HTMLElement", () => {
    expect(instance.getContent().innerHTML).toEqual('Test');
  });

  it("should have child element if other Block passed through props", () => {
    const child = new ChildBlock();
    const parent = new ParentBlock({ child });

    expect(parent.getContent().childElementCount).toBe(1);
  });

  it("should have valid child's text content if other Block passed through props", () => {
    const child = new ChildBlock();
    const parent = new ParentBlock({ child });

    expect(parent.getContent().querySelector('.child')?.textContent).toBe("Child content");
  });

  it("should call componentDidUpdate whenever props change", () => {
    const spy = jest.spyOn(instance as any, "componentDidUpdate");
    instance.setProps({ testText: "new text" });
    expect(spy).toHaveBeenCalled();
  });
});
