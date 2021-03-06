import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '../svg/brackets.svg';
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';

export default class WildCard extends Plugin {
	init() {

		const editor = this.editor;

        const wildcards = this.editor.config.get('wildcards');

        editor.ui.componentFactory.add('wildcard', locale => {

            const dropdownView = createDropdown(locale);

            dropdownView.buttonView.set({
                label: 'Marcatori dati documento',
                icon: imageIcon,
                tooltip: true
            });

            // create dropdown items collection
            const items = new Collection();

            // loop wildcards and set them
            for(const card of wildcards) {

                const item = {
                    type: 'button',
                    model: new Model({
                        withText: true,
                        label: card.label,
                        wildcard: card.wildcard
                    })
                }

                items.add(item);

            }

            dropdownView.on('execute', (args) => {
                
                const src = args.source;
                
                const viewFragment = editor.data.processor.toView(src.wildcard);

                const modelFragment = editor.data.toModel(viewFragment);

                editor.model.insertContent(modelFragment);

            })

            addListToDropdown(dropdownView, items);

            return dropdownView;

        })

    }
}
