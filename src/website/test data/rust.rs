use std::env

fn main() {
	let x: Vec<String> = env::args().collect();
	println!("{:?}", x);
}
