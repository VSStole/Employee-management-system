const db =require('../db/db');

async function getAll(){
    const data = await db.query('Select * From manufacturer ORDER BY name');
    return data;
}


async function getByPage(page, size, orderBy, order) {
	console.log(page, size, orderBy, order);
	const queryTotal = 'SELECT COUNT(*) as totalItems FROM manufacturer'
	const [total] = await db.query(queryTotal);
	const lastPage = Math.ceil(total.totalItems/size);
	page = page <=lastPage ? page : lastPage;
    console.log('page', page);
	const offset = (page-1)  * size;
    ////////////////////////////////////////////////////////////////////////////
	const query = `SELECT manufacturer.*, city.name AS cityName FROM manufacturer INNER JOIN City ON manufacturer.city=city.zip_code  ORDER BY ${orderBy} ${order} LIMIT ${size} OFFSET ${offset}`
    console.log(query);
    let data = await db.query(query);
	
	data = data.map(man => { 	const newobj =  {...man, city: {zip_code: man.city, name: man.cityName}}; 
								delete newobj.cityName;
								return newobj	
							});
	const pageResponse = {
		content: data,
		totalItems: total.totalItems,
		page: page,
		size: size
	}
	
    return pageResponse;
}
///////////////////////////////////////////////////////////////////////////////////////////////
async function get(id) {
    const data = await db.query(`SELECT * FROM manufacturer WHERE id = ${id}`);
    if (data && data.length > 0) {
        return data[0];
    }
    let message = `Invalid manufacturer id = ${id}`;
    return { message };
}

async function create(manufacturer) {
    const query = `INSERT INTO manufacturer	(company_number, name,tax_number,city) VALUES ('${manufacturer.company_number}', '${manufacturer.name}', '${manufacturer.tax_number}', ${manufacturer.city})`;
    console.log(query);
    const result = await db.query(query);
    let message = 'Error in creating city!';
    if (result.affectedRows) {
        message = 'Manufacturer is successfully created!';
    }
    return { message };
}

async function update(id, manufacturer) {
    const result = await db.query(`UPDATE manufacturer SET company_number = '${manufacturer.company_number}', name = '${manufacturer.name}', tax_number = '${manufacturer.tax_number}', city = ${manufacturer.city}  WHERE id = ${id}`);
    let message = 'Error in updating city!';
    if (result.affectedRows) {
        message = 'Manufacturer is successfully updated!';
    }
    return { message };
}

async function remove(id) {
    const result = await db.query(`DELETE FROM manufacturer WHERE id= ${id}`);
    let message = 'Error in deleting manufacturer!';
    if (result.affectedRows) {
        message = 'Manufacturer is successfully deleted!';
    }
    return { message };
}

module.exports = {
    getAll,
	getByPage,
    get,
    create,
    update,
    remove
}