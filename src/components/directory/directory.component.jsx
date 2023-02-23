import CategoryItem from '../category-item/category-item.component'

function Directory(props) {
    return (
        props.categories.map((category) => {
            return (
                <CategoryItem category={category} />
            );
        })
    );
}

export  default Directory;