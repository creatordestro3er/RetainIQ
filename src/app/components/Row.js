import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import Variant from './Variant';

const imageOptions = [
  'https://5.imimg.com/data5/SELLER/Default/2022/8/BC/IT/RJ/18451800/traditional-look-soft-silk-saree-with-blouse.jpeg',
  'https://assets.ajio.com/medias/sys_master/root/20230728/GBrh/64c3db50a9b42d15c979555c/-473Wx593H-466398360-green-MODEL.jpg',
 'https://assets.ajio.com/medias/sys_master/root/20230728/GBrh/64c3db50a9b42d15c979555c/-473Wx593H-466398360-green-MODEL.jpg',
 'https://assets.ajio.com/medias/sys_master/root/20230728/GBrh/64c3db50a9b42d15c979555c/-473Wx593H-466398360-green-MODEL.jpg',
 'https://assets.ajio.com/medias/sys_master/root/20230728/GBrh/64c3db50a9b42d15c979555c/-473Wx593H-466398360-green-MODEL.jpg',
 'https://www.collinsdictionary.com/images/full/shirt_378037390_1000.jpg',
 'https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ=',
 'https://assets.ajio.com/medias/sys_master/root/20230605/vTcw/647de83042f9e729d7234ec6/-473Wx593H-466235200-green-MODEL.jpg',
 'https://m.media-amazon.com/images/I/61bPziRUs-L._AC_UY1100_.jpg',
 'https://assets.ajio.com/medias/sys_master/root/20230620/v1eJ/649183af42f9e729d750203d/-473Wx593H-466291886-orange-MODEL.jpg',
 'https://static7.depositphotos.com/1040166/759/i/450/depositphotos_7591611-stock-photo-blue-baseball.jpg',
 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
 'https://assets.ajio.com/medias/sys_master/root/20230728/GBrh/64c3db50a9b42d15c979555c/-473Wx593H-466398360-green-MODEL.jpg',
 'https://m.media-amazon.com/images/I/419DHgF1nqL._AC_UY1100_.jpg',
  
];

const Row = ({ id, index, moveRow, deleteRow, rowVariants, setRowVariants }) => {
  const ref = useRef(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [currentVariantIndex, setCurrentVariantIndex] = useState(null);
  const [showRowPopup, setShowRowPopup] = useState(false);
  const [showDesignPopup, setShowDesignPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productFilter, setProductFilter] = useState('');

  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useGesture({
    onDrag: ({ offset: [x] }) => {
      api.start({ x });
    },
    onDragEnd: ({ offset: [x] }) => {
      const snappedX = Math.round(x / 200) * 200; // Adjust 200 based on variant width
      api.start({ x: snappedX });
    },
  });

  const [, drop] = useDrop({
    accept: 'row',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'row',
    item: { type: 'row', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleVariantChange = (variantIndex, url) => {
    const newVariants = [...rowVariants];
    newVariants[variantIndex] = url;
    setRowVariants(newVariants);
  };

  const handleAddDesignClick = (variantIndex) => {
    setCurrentVariantIndex(variantIndex);
    setShowImagePicker(true);
  };

  const handleImageSelect = (url) => {
    handleVariantChange(currentVariantIndex, url);
    setShowImagePicker(false);
    setShowDesignPopup(true); // Show design added popup
    setTimeout(() => {
      setShowDesignPopup(false);
    }, 3000); // Hide pop-up after 3 seconds
  };

  const handleAddVariant = () => {
    setRowVariants([...rowVariants, '']);
    setShowRowPopup(true); // Show row added popup
    setTimeout(() => {
      setShowRowPopup(false);
    }, 3000); // Hide pop-up after 3 seconds
  };

  const handleDeleteLastVariant = () => {
    if (rowVariants.length > 1) {
      setRowVariants(rowVariants.slice(0, -1));
      setShowDeletePopup(true); // Show delete variant popup
      setTimeout(() => {
        setShowDeletePopup(false);
      }, 3000); // Hide pop-up after 3 seconds
    }
  };

  const handleDeleteRow = () => {
    deleteRow(id);
    setShowDeletePopup(true); // Show delete row popup
    setTimeout(() => {
      setShowDeletePopup(false);
    }, 3000); // Hide pop-up after 3 seconds
  };

  return (
    <div ref={ref} className="relative flex flex-col items-center p-4 border-b border-gray-200" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="w-full flex items-center group relative">
        <div className="w-1/12 flex items-center justify-center relative">
          <span className="text-lg font-bold">{index + 1}:</span> {/* Display row number in bold */}
          <button 
            onClick={handleDeleteRow} 
            className="absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2 bg-white p-2 border border-gray-300 rounded-full text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ zIndex: 10 }}
          >
            🗑️
          </button>
        </div>
        
        <animated.div {...bind()} style={{ x }} className="w-11/12 flex items-center overflow-x-auto">
          <div className="flex flex-nowrap">
            <div className="w-1/4 flex flex-col items-center">
              <span className="font-semibold">Product Filter:</span>
              <button
                onClick={() => alert('Add Product Filters')}
                className="w-full h-16 border border-gray-300 rounded-lg flex justify-center items-center text-gray-500"
              >
                <span className="text-base font-semibold">+ Add Product Filters</span>
              </button>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <span className="font-semibold">Primary Variant:</span>
              <Variant
                index={0}
                variant={rowVariants[0]}
                handleVariantChange={handleVariantChange}
                addDesign={() => handleAddDesignClick(0)}
              />
            </div>
            {rowVariants.slice(1).map((variant, idx) => (
              <div key={idx + 1} className="w-1/4 flex flex-col items-center">
                <span className="font-semibold">{`Variant ${idx + 2}`}</span>
                <Variant
                  index={idx + 1}
                  variant={variant}
                  handleVariantChange={handleVariantChange}
                  addDesign={() => handleAddDesignClick(idx + 1)}
                />
              </div>
            ))}
            <div className="flex flex-col items-center">
              <button
                onClick={handleAddVariant}
                className="w-16 h-16 border border-gray-300 rounded-lg flex justify-center items-center text-gray-500 m-1"
              >
                <span className="text-2xl font-bold">+</span> {/* Plus sign */}
              </button>
              <button
                onClick={handleDeleteLastVariant}
                className="w-16 h-16 border border-gray-300 rounded-lg flex justify-center items-center text-gray-500 m-1"
              >
                <span className="text-2xl font-bold">-</span> {/* Minus sign */}
              </button>
            </div>
          </div>
        </animated.div>
      </div>

      {showImagePicker && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl mb-4">Select a design to link</h2>
            <div className="grid grid-cols-4 gap-4">
              {imageOptions.map((url, idx) => (
                <div key={idx} className="cursor-pointer" onClick={() => handleImageSelect(url)}>
                  <img src={url} alt={`Option ${idx + 1}`} className="w-32 h-32 object-cover rounded-lg" />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowImagePicker(false)}
              className="mt-4 p-2 bg-gray-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showRowPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded-lg shadow-lg">
         Variant Added
        </div>
      )}
      {showDesignPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded-lg shadow-lg">
          Design Added
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-lg shadow-lg">
          Variant Deleted
        </div>
      )}
    </div>
  );
};

export default Row;
