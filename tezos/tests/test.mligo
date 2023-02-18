

let assert_string_failure (res : test_exec_result) (expected : string) : unit =
  let expected = Test.eval expected in
  match res with
  | Fail (Rejected (actual,_)) -> assert (Test.michelson_equal actual expected)
  | Fail (Balance_too_low _) -> failwith "contract failed: balance too low"
  | Fail (Other s) -> failwith s
  | Success _gas -> failwith "contract did not failed but was expected to fail"

let test =
    // setup accounts 
    let () = Test.reset_state 4n ([] : tez list) in
    let toto: address = Test.nth_bootstrap_account 0 in
    let nini: address = Test.nth_bootstrap_account 1 in
    let Hugo: address = Test.nth_bootstrap_account 2 in
    let gohu: address = Test.nth_bootstrap_account 3 in


//Test generate collection

//Mint