import { Block } from "../../services/block";
import type { IBlockProps } from '../../types/services/block/Block';

export default class FileInput extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<div class="app__file-input-with-label">
                    <input 
                        type="file" 
                        name="{{ name }}" 
                        id="{{ id }}"
                        class="app__file-input"
                    />
                    <label for="{{ id }}" class="app__file-input-button">
                        <img class="app__file-input-image" src="{{ src }}" alt="Profile image" />
                    </label>
                </div>`;
  }
}
